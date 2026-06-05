-- ── 1. Update subscription_tier constraint ───────────────────────────────────
-- Rename 'monthly' → 'course_pass' and keep 'lifetime'

alter table public.profiles
  drop constraint if exists profiles_subscription_tier_check;

alter table public.profiles
  add constraint profiles_subscription_tier_check
  check (subscription_tier in ('course_pass', 'lifetime'));

-- Migrate any existing 'monthly' rows (safety net)
update public.profiles
  set subscription_tier = 'course_pass'
  where subscription_tier = 'monthly';


-- ── 2. lesson_progress table ─────────────────────────────────────────────────
create table public.lesson_progress (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid references public.profiles(id) on delete cascade not null,
  lesson_id            text not null,
  completed_at         timestamptz,                    -- null = started but not finished
  last_position_seconds integer not null default 0,   -- resume from here
  updated_at           timestamptz not null default now(),

  unique (user_id, lesson_id)                         -- one row per user per lesson
);

-- Keep updated_at current
create trigger lesson_progress_updated_at
  before update on public.lesson_progress
  for each row execute procedure public.set_updated_at();

-- Row Level Security
alter table public.lesson_progress enable row level security;

create policy "Users can view their own progress"
  on lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on lesson_progress for update
  using (auth.uid() = user_id);
