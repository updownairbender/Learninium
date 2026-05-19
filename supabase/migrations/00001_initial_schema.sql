-- ============================================================================
-- Migration 00001: Initial Schema
-- Learninium — Educational Webapp
-- ============================================================================

-- 0. Extensions
create extension if not exists "pgcrypto";

-- ============================================================================
-- 1. TABLES
-- ============================================================================

-- 1a. profiles — mirrors auth.users with role & metadata
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        text not null default 'student' check (role in ('admin', 'teacher', 'student')),
  name        text not null default '',
  bio         text,
  avatar_url  text,
  created_at  timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- 1b. courses — created by teachers
create table if not exists public.courses (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text not null default '',
  teacher_id    uuid not null references public.profiles(id) on delete cascade,
  category      text not null default 'General',
  difficulty    text not null default 'beginner' check (difficulty in ('beginner', 'intermediate', 'advanced')),
  thumbnail_url text,
  created_at    timestamptz not null default now()
);
alter table public.courses enable row level security;

-- 1c. enrollments — links students to courses
create table if not exists public.enrollments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  course_id   uuid not null references public.courses(id) on delete cascade,
  progress    real not null default 0 check (progress >= 0 and progress <= 100),
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_id)
);
alter table public.enrollments enable row level security;

-- ============================================================================
-- 2. TRIGGERS
-- ============================================================================

-- Auto-create profile row when a user signs up via auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, role, name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'role', 'student'),
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- 3. RLS HELPER FUNCTIONS
-- ============================================================================

-- Avoid repetitive subqueries in policies
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_teacher()
returns boolean
language sql
stable
security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'teacher'
  );
$$;

-- ============================================================================
-- 4. ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- 3a. profiles
-- Anyone can read profiles (names, avatars are public)
create policy "profiles_select_anyone"
  on public.profiles for select
  using (true);

-- Trigger-based insert handles profile creation; this allows manual inserts if needed
create policy "profiles_insert_self"
  on public.profiles for insert
  with check (id = auth.uid());

-- Users can update their own profile
create policy "profiles_update_self"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- Admins can update any profile (change roles, names)
create policy "profiles_update_admin"
  on public.profiles for update
  using (is_admin());

-- Only admins can delete profiles
create policy "profiles_delete_admin"
  on public.profiles for delete
  using (is_admin());

-- 3b. courses
-- Anyone can browse courses (discovery)
create policy "courses_select_anyone"
  on public.courses for select
  using (true);

-- Teachers can create courses (must set teacher_id to self)
create policy "courses_insert_teacher"
  on public.courses for insert
  with check (
    teacher_id = auth.uid()
    and is_teacher()
  );

-- Admins can create courses
create policy "courses_insert_admin"
  on public.courses for insert
  with check (is_admin());

-- Owner teacher or admin can update
create policy "courses_update_owner"
  on public.courses for update
  using (teacher_id = auth.uid() or is_admin());

-- Owner teacher or admin can delete
create policy "courses_delete_owner"
  on public.courses for delete
  using (teacher_id = auth.uid() or is_admin());

-- 3c. enrollments
-- Students see their own enrollments
create policy "enrollments_select_self"
  on public.enrollments for select
  using (user_id = auth.uid());

-- Teachers see enrollments in their courses
create policy "enrollments_select_teacher"
  on public.enrollments for select
  using (
    exists (
      select 1 from public.courses
      where courses.id = enrollments.course_id
        and courses.teacher_id = auth.uid()
    )
  );

-- Admins see all enrollments
create policy "enrollments_select_admin"
  on public.enrollments for select
  using (is_admin());

-- Students can enroll themselves
create policy "enrollments_insert_self"
  on public.enrollments for insert
  with check (user_id = auth.uid());

-- Students can update their own progress
create policy "enrollments_update_self"
  on public.enrollments for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Teachers can update progress for students in their courses
create policy "enrollments_update_teacher"
  on public.enrollments for update
  using (
    exists (
      select 1 from public.courses
      where courses.id = enrollments.course_id
        and courses.teacher_id = auth.uid()
    )
  );

-- Admins can update any enrollment
create policy "enrollments_update_admin"
  on public.enrollments for update
  using (is_admin());

-- Students can unenroll (delete their enrollment)
create policy "enrollments_delete_self"
  on public.enrollments for delete
  using (user_id = auth.uid());

-- Admins can delete any enrollment
create policy "enrollments_delete_admin"
  on public.enrollments for delete
  using (is_admin());

-- ============================================================================
-- 5. INDEXES
-- ============================================================================

create index if not exists idx_courses_teacher_id on public.courses(teacher_id);
create index if not exists idx_courses_category  on public.courses(category);
create index if not exists idx_courses_title_trgm on public.courses using gin (title gin_trgm_ops);
create index if not exists idx_enrollments_user_id  on public.enrollments(user_id);
create index if not exists idx_enrollments_course_id on public.enrollments(course_id);

-- Note: pg_trgm extension must be enabled separately for the trigram index:
--   create extension if not exists "pg_trgm";
