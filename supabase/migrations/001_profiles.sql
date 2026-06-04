-- Profiles table — extends auth.users with subscription info
create table public.profiles (
  id                     uuid references auth.users on delete cascade not null primary key,
  stripe_customer_id     text unique,
  subscription_status    text not null default 'free'
                           check (subscription_status in ('free', 'active', 'cancelled', 'expired')),
  subscription_tier      text
                           check (subscription_tier in ('monthly', 'lifetime')),
  subscription_expires_at timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

-- Row Level Security: users can only read/update their own profile
alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Keep updated_at current automatically
create function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- Auto-create a profile row whenever a new user signs up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
