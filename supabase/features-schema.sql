-- ============================================================
-- FRESCO — Phase 2 & 3 Features Schema
-- Run in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ---- PROMO CODES ----
create table if not exists public.promo_codes (
  id           serial primary key,
  code         text unique not null,
  discount_type text not null check (discount_type in ('percent', 'flat')),
  discount_value numeric(8,2) not null,
  min_order    numeric(8,2) default 0,
  max_uses     integer default null,
  uses_count   integer default 0,
  expires_at   date default null,
  is_active    boolean default true,
  created_at   timestamptz default now()
);

-- ---- REVIEWS ----
create table if not exists public.reviews (
  id           serial primary key,
  user_id      uuid references auth.users(id) on delete set null,
  user_name    text,
  product_slug text not null,
  rating       integer not null check (rating between 1 and 5),
  comment      text,
  order_id     bigint references public.orders(id) on delete set null,
  created_at   timestamptz default now()
);

-- Prevent duplicate review per user per product
create unique index if not exists reviews_user_product_idx on public.reviews(user_id, product_slug);

-- ---- LOYALTY POINTS ----
-- Add balance column to profiles
alter table public.profiles add column if not exists loyalty_points integer default 0;

-- Transaction log
create table if not exists public.loyalty_txns (
  id           serial primary key,
  user_id      uuid references auth.users(id) on delete cascade,
  points       integer not null,
  reason       text,
  order_id     bigint references public.orders(id) on delete set null,
  created_at   timestamptz default now()
);

-- ---- RLS ----
-- Promo codes
alter table public.promo_codes enable row level security;
create policy "Public: read active promos"  on promo_codes for select using (is_active = true);
create policy "Admin: manage promos"        on promo_codes for all   using (get_my_role() in ('owner','staff'));

-- Reviews
alter table public.reviews enable row level security;
create policy "Public: read reviews"        on reviews for select using (true);
create policy "Auth: insert review"         on reviews for insert with check (auth.uid() = user_id);
create policy "Own review: update"          on reviews for update using (auth.uid() = user_id);
create policy "Admin: manage reviews"       on reviews for all   using (get_my_role() in ('owner','staff'));

-- Loyalty txns
alter table public.loyalty_txns enable row level security;
create policy "Own loyalty: read"           on loyalty_txns for select using (auth.uid() = user_id);
create policy "Anyone: insert loyalty"      on loyalty_txns for insert with check (true);
create policy "Admin: manage loyalty"       on loyalty_txns for all   using (get_my_role() in ('owner','staff'));

-- Sample promo codes to get started
insert into public.promo_codes (code, discount_type, discount_value, min_order, max_uses)
values
  ('FRESCO10', 'percent', 10, 100, 100),
  ('WELCOME20', 'flat',   20,  50, 50)
on conflict (code) do nothing;
