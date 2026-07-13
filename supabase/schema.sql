-- Threads-clone schema
-- Run this once in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now()
);

alter table public.profiles
  add constraint username_format check (username ~ '^[a-z0-9_]{3,20}$');

alter table public.profiles enable row level security;

create policy "profiles are publicly readable"
  on public.profiles for select
  using (true);

create policy "users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'username',
      'user_' || substr(new.id::text, 1, 8)
    ),
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- posts
-- ---------------------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  content text not null check (char_length(content) between 1 and 500),
  reply_to_id uuid references public.posts (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists posts_author_id_idx on public.posts (author_id);
create index if not exists posts_reply_to_id_idx on public.posts (reply_to_id);
create index if not exists posts_created_at_idx on public.posts (created_at desc);

alter table public.posts enable row level security;

create policy "posts are publicly readable"
  on public.posts for select
  using (true);

create policy "users can create their own posts"
  on public.posts for insert
  with check (auth.uid() = author_id);

create policy "users can delete their own posts"
  on public.posts for delete
  using (auth.uid() = author_id);

-- ---------------------------------------------------------------------------
-- likes
-- ---------------------------------------------------------------------------
create table if not exists public.likes (
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

alter table public.likes enable row level security;

create policy "likes are publicly readable"
  on public.likes for select
  using (true);

create policy "users can like as themselves"
  on public.likes for insert
  with check (auth.uid() = user_id);

create policy "users can unlike their own like"
  on public.likes for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- follows
-- ---------------------------------------------------------------------------
create table if not exists public.follows (
  follower_id uuid not null references public.profiles (id) on delete cascade,
  following_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  constraint no_self_follow check (follower_id <> following_id)
);

alter table public.follows enable row level security;

create policy "follows are publicly readable"
  on public.follows for select
  using (true);

create policy "users can follow as themselves"
  on public.follows for insert
  with check (auth.uid() = follower_id);

create policy "users can unfollow as themselves"
  on public.follows for delete
  using (auth.uid() = follower_id);
