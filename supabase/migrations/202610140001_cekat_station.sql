-- Additive CEKAT integration. Does not change existing tables or Auth users.
begin;

create table public.cekat_facilities (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(name) between 1 and 200),
  created_at timestamptz not null default now()
);
create table public.cekat_staff (
  user_id uuid primary key references auth.users(id),
  facility_id uuid not null references public.cekat_facilities(id),
  active boolean not null default true
);
create table public.cekat_patients (
  user_id uuid primary key references auth.users(id),
  facility_id uuid not null references public.cekat_facilities(id),
  name text not null check (length(name) between 1 and 150),
  created_at timestamptz not null default now()
);
create table public.cekat_registrations (
  user_id uuid primary key references public.cekat_patients(user_id),
  code text not null unique default upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 20)),
  created_at timestamptz not null default now()
);
create table public.cekat_queue_counters (
  facility_id uuid not null references public.cekat_facilities(id),
  visit_date date not null,
  last_number integer not null,
  primary key (facility_id, visit_date)
);
create table public.cekat_screenings (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.cekat_patients(user_id),
  facility_id uuid not null references public.cekat_facilities(id),
  recorded_by uuid not null references auth.users(id),
  request_id uuid not null,
  created_at timestamptz not null default now(),
  visit_date date not null default (now() at time zone 'Asia/Jakarta')::date,
  queue_number integer not null,
  queue_status text not null default 'waiting' check (queue_status in ('waiting','called','completed')),
  systolic numeric not null check (systolic between 40 and 300),
  diastolic numeric not null check (diastolic between 20 and 200 and diastolic < systolic),
  blood_glucose numeric not null check (blood_glucose between 10 and 1000),
  glucose_type text not null check (glucose_type in ('fasting','random','postmeal')),
  pulse numeric not null check (pulse between 20 and 250),
  spo2 numeric check (spo2 between 0 and 100),
  weight_kg numeric not null check (weight_kg between 2 and 400),
  height_cm numeric not null check (height_cm between 30 and 250),
  waist_cm numeric check (waist_cm between 10 and 250),
  notes text not null default '' check (length(notes) <= 2000),
  unique (facility_id, visit_date, queue_number),
  unique (recorded_by, request_id)
);
create index cekat_screenings_patient_date on public.cekat_screenings (patient_id, created_at desc);
create index cekat_screenings_facility_queue on public.cekat_screenings (facility_id, visit_date, queue_status);
create index cekat_patients_facility on public.cekat_patients (facility_id);

alter table public.cekat_facilities enable row level security;
alter table public.cekat_staff enable row level security;
alter table public.cekat_patients enable row level security;
alter table public.cekat_registrations enable row level security;
alter table public.cekat_screenings enable row level security;
alter table public.cekat_queue_counters enable row level security;

-- No client can create or elevate a staff account.
revoke all on public.cekat_facilities, public.cekat_staff, public.cekat_patients,
  public.cekat_registrations, public.cekat_screenings, public.cekat_queue_counters from public, anon, authenticated;
grant select on public.cekat_facilities, public.cekat_staff, public.cekat_patients,
  public.cekat_registrations, public.cekat_screenings to authenticated;
grant insert (patient_id, facility_id, recorded_by, request_id, systolic, diastolic, blood_glucose,
  glucose_type, pulse, spo2, weight_kg, height_cm, waist_cm, notes) on public.cekat_screenings to authenticated;
grant update (queue_status) on public.cekat_screenings to authenticated;

create function public.cekat_staff_facility() returns uuid
language sql stable security definer set search_path = '' as $$
  select facility_id from public.cekat_staff where user_id = auth.uid() and active;
$$;
revoke all on function public.cekat_staff_facility() from public;
grant execute on function public.cekat_staff_facility() to authenticated;

create policy cekat_facilities_read on public.cekat_facilities for select to authenticated using (true);
create policy cekat_staff_self on public.cekat_staff for select to authenticated using (user_id = auth.uid());
create policy cekat_patient_read on public.cekat_patients for select to authenticated
  using (user_id = auth.uid() or facility_id = public.cekat_staff_facility());
create policy cekat_registration_self on public.cekat_registrations for select to authenticated using (user_id = auth.uid());
create policy cekat_screening_read on public.cekat_screenings for select to authenticated
  using (patient_id = auth.uid() or facility_id = public.cekat_staff_facility());
create policy cekat_screening_insert on public.cekat_screenings for insert to authenticated
  with check (recorded_by = auth.uid() and facility_id = public.cekat_staff_facility()
    and exists (select 1 from public.cekat_patients p where p.user_id = patient_id and p.facility_id = cekat_screenings.facility_id));
create policy cekat_queue_update on public.cekat_screenings for update to authenticated
  using (facility_id = public.cekat_staff_facility()) with check (facility_id = public.cekat_staff_facility());

create function public.cekat_register_patient(patient_name text, selected_facility uuid)
returns setof public.cekat_patients
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if length(trim(patient_name)) not between 1 and 150 then raise exception 'Invalid name'; end if;
  if not exists (select 1 from public.cekat_facilities where id = selected_facility) then raise exception 'Unknown facility'; end if;
  insert into public.cekat_patients (user_id, facility_id, name)
    values (auth.uid(), selected_facility, trim(patient_name)) on conflict (user_id) do nothing;
  insert into public.cekat_registrations (user_id) values (auth.uid()) on conflict (user_id) do nothing;
  return query select * from public.cekat_patients where user_id = auth.uid();
end;
$$;
revoke all on function public.cekat_register_patient(text, uuid) from public;
grant execute on function public.cekat_register_patient(text, uuid) to authenticated;

create function public.cekat_lookup_patient(registration_code text)
returns table (user_id uuid, name text, facility_id uuid)
language sql stable security definer set search_path = '' as $$
  select p.user_id, p.name, p.facility_id from public.cekat_patients p
  join public.cekat_registrations r on r.user_id = p.user_id
  where r.code = upper(trim(registration_code)) and p.facility_id = public.cekat_staff_facility();
$$;
revoke all on function public.cekat_lookup_patient(text) from public;
grant execute on function public.cekat_lookup_patient(text) to authenticated;

create function public.cekat_allocate_queue() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  -- Clients have no privileges on these server-owned timestamps or queue numbers.
  new.created_at := now();
  new.visit_date := (now() at time zone 'Asia/Jakarta')::date;
  insert into public.cekat_queue_counters (facility_id, visit_date, last_number)
    values (new.facility_id, new.visit_date, 1)
    on conflict (facility_id, visit_date) do update set last_number = public.cekat_queue_counters.last_number + 1
    returning last_number into new.queue_number;
  return new;
end;
$$;
revoke all on function public.cekat_allocate_queue() from public;
create trigger cekat_screening_queue before insert on public.cekat_screenings
  for each row execute function public.cekat_allocate_queue();

insert into public.cekat_facilities (name) values ('Puskesmas Pembantu Ngabab');
notify pgrst, 'reload schema';
commit;
