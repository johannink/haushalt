-- Haushaltstool: Einrichtung in Supabase
-- Alles markieren, im "SQL Editor" einfügen und auf "Run" klicken.
-- Darf auch mehrmals ausgeführt werden.

create table if not exists public.subs (
  id         text primary key,
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  data       jsonb not null,
  deleted    boolean not null default false,
  updated_at timestamptz not null default now()
);

create index if not exists subs_user_id_idx on public.subs (user_id);

-- Zugriff über die App (nur für angemeldete Personen)
grant select, insert, update, delete on public.subs to authenticated;

-- Jede Person sieht und ändert nur ihre eigenen Zeilen.
alter table public.subs enable row level security;

drop policy if exists "subs_select_own" on public.subs;
create policy "subs_select_own" on public.subs
  for select to authenticated using (user_id = (select auth.uid()));

drop policy if exists "subs_insert_own" on public.subs;
create policy "subs_insert_own" on public.subs
  for insert to authenticated with check (user_id = (select auth.uid()));

drop policy if exists "subs_update_own" on public.subs;
create policy "subs_update_own" on public.subs
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "subs_delete_own" on public.subs;
create policy "subs_delete_own" on public.subs
  for delete to authenticated using (user_id = (select auth.uid()));

-- Live-Abgleich: Änderungen erscheinen auf den anderen Geräten ohne Neuladen.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'subs'
  ) then
    alter publication supabase_realtime add table public.subs;
  end if;
end $$;
