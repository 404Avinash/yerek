-- ============================================================
-- FRESCO — Row Level Security Policies
-- Run this SECOND in: Supabase Dashboard → SQL Editor → New Query
-- Run AFTER schema.sql
-- ============================================================

-- Helper: get current user's role
create or replace function public.get_my_role()
returns text as $$
  select role from public.profiles where id = auth.uid();
$$ language sql security definer stable;

-- Enable RLS on all tables
alter table public.profiles    enable row level security;
alter table public.categories  enable row level security;
alter table public.farms       enable row level security;
alter table public.products    enable row level security;
alter table public.batches     enable row level security;
alter table public.waitlist    enable row level security;
alter table public.qr_scans    enable row level security;
alter table public.saved_boxes enable row level security;

-- ---- PROFILES ----
create policy "Own profile: read"   on profiles for select using (auth.uid() = id);
create policy "Own profile: update" on profiles for update using (auth.uid() = id);
create policy "Admin: read all profiles" on profiles for select using (get_my_role() in ('owner','staff'));
create policy "Owner: update any profile" on profiles for update using (get_my_role() = 'owner');

-- ---- CATEGORIES — public read, admin write ----
create policy "Public: read categories"   on categories for select using (true);
create policy "Admin: manage categories"  on categories for all using (get_my_role() in ('owner','staff'));

-- ---- FARMS — public read, admin write ----
create policy "Public: read farms"   on farms for select using (true);
create policy "Admin: manage farms"  on farms for all using (get_my_role() in ('owner','staff'));

-- ---- PRODUCTS — public read, admin write ----
create policy "Public: read products"   on products for select using (true);
create policy "Admin: manage products"  on products for all using (get_my_role() in ('owner','staff'));

-- ---- BATCHES — public read, admin write ----
create policy "Public: read batches"   on batches for select using (true);
create policy "Admin: manage batches"  on batches for all using (get_my_role() in ('owner','staff'));

-- ---- WAITLIST — anyone insert, admin read ----
create policy "Anyone: join waitlist"   on waitlist for insert with check (true);
create policy "Admin: read waitlist"    on waitlist for select using (get_my_role() in ('owner','staff'));
create policy "Admin: update waitlist"  on waitlist for update using (get_my_role() in ('owner','staff'));

-- ---- QR SCANS — anyone insert, admin read ----
create policy "Anyone: log qr scan"  on qr_scans for insert with check (true);
create policy "Admin: read qr scans" on qr_scans for select using (get_my_role() in ('owner','staff'));

-- ---- SAVED BOXES — users manage own, admin read ----
create policy "Own boxes: all"       on saved_boxes for all using (auth.uid() = user_id);
create policy "Admin: read all boxes" on saved_boxes for select using (get_my_role() in ('owner','staff'));
