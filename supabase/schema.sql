-- ============================================================
-- FRESCO — Supabase Schema
-- Run this FIRST in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Profiles (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  role text not null default 'consumer' check (role in ('owner', 'staff', 'consumer')),
  city text,
  phone text,
  joined_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Categories
create table if not exists public.categories (
  id serial primary key,
  slug text unique not null,
  name text not null,
  emoji text,
  sub text,
  bg_gradient text,
  status text,
  restock_time text,
  source text,
  freshness_score float default 9.0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Farms
create table if not exists public.farms (
  id serial primary key,
  name text not null,
  owner_name text,
  location text,
  emoji text,
  supply_pct text,
  years_partnered int default 0,
  is_certified boolean default false,
  phone text,
  created_at timestamptz default now()
);

-- Products
create table if not exists public.products (
  id serial primary key,
  slug text unique not null,
  name text not null,
  aka text,
  emoji text,
  category_slug text,
  farm_id int references public.farms(id),
  tagline text,
  description text,
  freshness_score float default 9.0,
  status text default 'Fresh',
  is_seasonal boolean default false,
  is_available boolean default true,
  price_per_kg int default 50,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Daily Batches (core operational table)
create table if not exists public.batches (
  id serial primary key,
  product_id int references public.products(id),
  batch_code text not null,
  harvested_at text,
  farm_id int references public.farms(id),
  transit_text text,
  arrived_at text,
  storage_conditions text,
  qty_kg float default 0,
  freshness_score float default 9.0,
  is_active boolean default true,
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- Waitlist
create table if not exists public.waitlist (
  id serial primary key,
  name text not null,
  email text unique not null,
  city text,
  joined_at timestamptz default now(),
  source text default 'web',
  is_notified boolean default false
);

-- QR Scan Logs
create table if not exists public.qr_scans (
  id serial primary key,
  batch_code text,
  product_slug text,
  scanned_at timestamptz default now(),
  user_id uuid references public.profiles(id)
);

-- Consumer Saved Boxes
create table if not exists public.saved_boxes (
  id serial primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  name text default 'My Box',
  product_slugs text[] default '{}',
  created_at timestamptz default now()
);

-- ============================================================
-- TRIGGER: Auto-create profile row when a user signs up
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'consumer'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- SEED: 5 Categories
-- ============================================================
insert into public.categories (slug, name, emoji, sub, bg_gradient, status, restock_time, source, freshness_score) values
  ('leafy',    'Leafy Vegetables',    '🥬', 'Harvested fresh daily', 'linear-gradient(135deg,#f0fdf4,#dcfce7,#bbf7d0)', 'Fresh Today',    'Restocked Every Morning',   'Farms within 60km',  9.4),
  ('root',     'Root Vegetables',     '🥕', 'Earth''s natural bounty', 'linear-gradient(135deg,#fff7ed,#ffedd5,#fed7aa)', 'Sourced Weekly',  'Restocked Twice Weekly',    'Farms within 120km', 9.1),
  ('tuber',    'Tuber Vegetables',    '🥔', 'Wholesome staples',      'linear-gradient(135deg,#fefce8,#fef9c3,#fef08a)', 'Farm Direct',     'Restocked Weekly',          'Partner Farms',      9.0),
  ('fruiting', 'Fruiting Vegetables', '🍅', 'Ripened to perfection',  'linear-gradient(135deg,#fff1f2,#ffe4e6,#fecdd3)', 'Peak Ripeness',   'Restocked Daily',           'Farms within 80km',  9.2),
  ('fruits',   'Fruits',              '🍌', 'Nature''s sweetest picks','linear-gradient(135deg,#fffbeb,#fef3c7,#fde68a)', 'Seasonal Picks',  'Restocked Twice Weekly',    'Partner Orchards',   9.1)
on conflict (slug) do nothing;

-- ============================================================
-- SEED: Farm Partners
-- ============================================================
insert into public.farms (name, owner_name, location, emoji, supply_pct, years_partnered, is_certified) values
  ('Sharma Greens',     'Rajesh Sharma',   'Sonipat, Haryana',          '🌿', '45%', 3, true),
  ('Patel Organics',    'Suresh Patel',    'Karnal, Haryana',           '🥬', '33%', 2, true),
  ('Verma Farms',       'Dinesh Verma',    'Panipat, Haryana',          '🌱', '22%', 1, false),
  ('Ramesh Farm',       'Ramesh Kumar',    'Sonipat, Haryana',          '🥕', '50%', 4, true),
  ('Gupta Roots',       'Mahesh Gupta',    'Rohtak, Haryana',           '🌰', '30%', 2, true),
  ('Singh''s Earth Farm','Gurpreet Singh', 'Hisar, Haryana',            '🥔', '20%', 1, false),
  ('Yadav Tubers',      'Santosh Yadav',   'Agra, UP',                  '🥔', '55%', 3, true),
  ('Narmada Farms',     'Anil Patel',      'Gwalior, MP',               '🥕', '15%', 1, false),
  ('Joshi Polyhouse',   'Deepak Joshi',    'Alwar, Rajasthan',          '🫑', '35%', 2, true),
  ('Khatri Gardens',    'Sunita Khatri',   'Rewari, Haryana',           '🍆', '25%', 1, false),
  ('Nashik Orchards',   'Vijay Patil',     'Nashik, Maharashtra',       '🍇', '35%', 2, true),
  ('HP Apple Growers',  'Mohan Thakur',    'Shimla, Himachal Pradesh',  '🍎', '40%', 3, true),
  ('Mathur Harvest',    'Prem Mathur',     'Aligarh, UP',               '🌿', '30%', 2, true),
  ('Coorg Estates',     'Vijay Patil',     'Nagpur, Maharashtra',       '🍊', '40%', 2, true)
on conflict do nothing;
