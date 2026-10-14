-- All fixtures are synthetic and are rolled back; no email is sent.
begin;
insert into auth.users (id, email, role, aud) values
 ('00110a01-5000-4000-8000-000000000001','cekat-test-a@example.invalid','authenticated','authenticated'),
 ('00110a01-5000-4000-8000-000000000002','cekat-test-b@example.invalid','authenticated','authenticated'),
 ('00110a01-5000-4000-8000-000000000003','cekat-test-staff-a@example.invalid','authenticated','authenticated'),
 ('00110a01-5000-4000-8000-000000000004','cekat-test-staff-b@example.invalid','authenticated','authenticated');
insert into public.cekat_facilities (id,name) values
 ('00110b01-5000-4000-8000-000000000001','TEST ONLY Faskes A'),
 ('00110b01-5000-4000-8000-000000000002','TEST ONLY Faskes B');
insert into public.cekat_staff (user_id,facility_id) values
 ('00110a01-5000-4000-8000-000000000003','00110b01-5000-4000-8000-000000000001'),
 ('00110a01-5000-4000-8000-000000000004','00110b01-5000-4000-8000-000000000002');

set local role authenticated;
select set_config('request.jwt.claim.sub','00110a01-5000-4000-8000-000000000001',true);
select public.cekat_register_patient('TEST ONLY Patient A','00110b01-5000-4000-8000-000000000001');
select set_config('request.jwt.claim.sub','00110a01-5000-4000-8000-000000000002',true);
select public.cekat_register_patient('TEST ONLY Patient B','00110b01-5000-4000-8000-000000000002');
reset role;
update public.cekat_registrations set code='11111111111111111111' where user_id='00110a01-5000-4000-8000-000000000001';
update public.cekat_registrations set code='22222222222222222222' where user_id='00110a01-5000-4000-8000-000000000002';

set local role authenticated;
select set_config('request.jwt.claim.sub','00110a01-5000-4000-8000-000000000001',true);
do $$ begin
 if (select count(*) from public.cekat_patients where user_id='00110a01-5000-4000-8000-000000000002')<>0 then raise exception 'FAIL: cross-patient profile access'; end if;
 if (select count(*) from public.cekat_registrations where user_id='00110a01-5000-4000-8000-000000000002')<>0 then raise exception 'FAIL: cross-patient barcode access'; end if;
 if (select count(*) from public.cekat_lookup_patient('22222222222222222222'))<>0 then raise exception 'FAIL: patient accessed staff lookup'; end if;
 begin
   insert into public.cekat_staff (user_id,facility_id) values (auth.uid(),'00110b01-5000-4000-8000-000000000001');
   raise exception 'FAIL: patient elevated own privileges';
 exception when insufficient_privilege then null; end;
end $$;

select set_config('request.jwt.claim.sub','00110a01-5000-4000-8000-000000000003',true);
do $$ begin
 if (select count(*) from public.cekat_lookup_patient('11111111111111111111'))<>1 then raise exception 'FAIL: legitimate staff lookup blocked'; end if;
 if (select count(*) from public.cekat_lookup_patient('22222222222222222222'))<>0 then raise exception 'FAIL: cross-facility staff lookup'; end if;
end $$;
insert into public.cekat_screenings (patient_id,facility_id,recorded_by,request_id,systolic,diastolic,blood_glucose,glucose_type,pulse,weight_kg,height_cm,spo2)
values ('00110a01-5000-4000-8000-000000000001','00110b01-5000-4000-8000-000000000001',auth.uid(),'00110c01-5000-4000-8000-000000000001',120,80,100,'random',75,60,160,98);
do $$ begin
 if (select queue_number from public.cekat_screenings where request_id='00110c01-5000-4000-8000-000000000001') is distinct from 1 then raise exception 'FAIL: queue allocation'; end if;
 begin
   insert into public.cekat_screenings (patient_id,facility_id,recorded_by,request_id,systolic,diastolic,blood_glucose,glucose_type,pulse,weight_kg,height_cm)
   values ('00110a01-5000-4000-8000-000000000002','00110b01-5000-4000-8000-000000000002',auth.uid(),'00110c01-5000-4000-8000-000000000002',120,80,100,'random',75,60,160);
   raise exception 'FAIL: cross-facility insert';
 exception when insufficient_privilege then null; end;
 begin
   update public.cekat_screenings set systolic=180 where request_id='00110c01-5000-4000-8000-000000000001';
   raise exception 'FAIL: historical measurement silently edited';
 exception when insufficient_privilege then null; end;
 begin
   insert into public.cekat_screenings (patient_id,facility_id,recorded_by,request_id,systolic,diastolic,blood_glucose,glucose_type,pulse,weight_kg,height_cm)
   values ('00110a01-5000-4000-8000-000000000001','00110b01-5000-4000-8000-000000000001',auth.uid(),'00110c01-5000-4000-8000-000000000001',120,80,100,'random',75,60,160);
   raise exception 'FAIL: duplicate save accepted';
 exception when unique_violation then null; end;
end $$;
update public.cekat_screenings set queue_status='called' where request_id='00110c01-5000-4000-8000-000000000001';
select set_config('request.jwt.claim.sub','00110a01-5000-4000-8000-000000000004',true);
do $$ begin
 if (select count(*) from public.cekat_screenings where request_id='00110c01-5000-4000-8000-000000000001')<>0 then raise exception 'FAIL: cross-facility result access'; end if;
end $$;
select set_config('request.jwt.claim.sub','00110a01-5000-4000-8000-000000000001',true);
do $$ begin
 if (select spo2 from public.cekat_screenings where request_id='00110c01-5000-4000-8000-000000000001') is distinct from 98 then raise exception 'FAIL: patient did not receive measured oxygen value'; end if;
 if (select queue_status from public.cekat_screenings where request_id='00110c01-5000-4000-8000-000000000001') is distinct from 'called' then raise exception 'FAIL: patient did not receive queue status'; end if;
end $$;
set local role anon;
do $$ begin
 begin
   perform 1 from public.cekat_screenings;
   raise exception 'FAIL: anonymous result access';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
rollback;
select 'PASS: patient isolation, staff scope, barcode access, immutable results, duplicate protection, queue and anonymous access. All fixtures rolled back.' as test_result;
