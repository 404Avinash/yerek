-- ============================================================
-- FRESCO — Orders & Cart Schema (Phase 2)
-- Run this in Supabase SQL Editor AFTER schema.sql
-- ============================================================

-- Orders
create table if not exists public.orders (
  id serial primary key,
  order_number text unique not null,
  user_id uuid references public.profiles(id),
  user_name text not null,
  user_phone text not null,
  user_email text,
  pickup_date date not null,
  pickup_slot text not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'packing', 'ready', 'picked_up', 'cancelled')),
  total_amount int default 0,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Order Items
create table if not exists public.order_items (
  id serial primary key,
  order_id int references public.orders(id) on delete cascade,
  product_slug text not null,
  product_name text not null,
  product_emoji text,
  qty_kg float not null,
  price_per_kg int not null,
  subtotal int not null
);
