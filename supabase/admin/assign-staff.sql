-- Run only after the project owner approves the exact verified account and facility.
-- Replace the email placeholder before reviewing/running in the SQL Editor.
begin;
do $$
declare
  target_email text := 'REPLACE_WITH_VERIFIED_EMAIL';
  target_facility text := 'Puskesmas Pembantu Ngabab';
  staff_user uuid;
  staff_facility uuid;
begin
  if target_email = 'REPLACE_WITH_VERIFIED_EMAIL' then
    raise exception 'Choose the approved verified email first';
  end if;
  select id into strict staff_user from auth.users
    where lower(email) = lower(target_email) and email_confirmed_at is not null and deleted_at is null;
  select id into strict staff_facility from public.cekat_facilities where name = target_facility;
  if exists (select 1 from public.cekat_staff where user_id = staff_user and facility_id <> staff_facility) then
    raise exception 'This account belongs to another facility; do not move access automatically';
  end if;
  insert into public.cekat_staff (user_id, facility_id, active)
    values (staff_user, staff_facility, true)
    on conflict (user_id) do update set active = true;
end;
$$;
commit;
