-- QualCheck — Schema
-- Run this in the Supabase SQL Editor

-- Profiles table (linked to auth.users)
create table if not exists public.profiles (
  id         uuid references auth.users on delete cascade primary key,
  nome       text not null,
  username   text not null unique,
  setor      text not null,
  funcao     text not null,
  email      text not null,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.profiles enable row level security;

-- Allow anyone to SELECT (needed for username uniqueness check during signup)
create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

-- Only owner can update
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Only owner can insert (server action inserts after signUp)
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Only owner can delete
create policy "Users can delete own profile"
  on public.profiles for delete
  using (auth.uid() = id);
