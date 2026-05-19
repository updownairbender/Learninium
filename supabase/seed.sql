-- ============================================================================
-- Seed Data — Learninium Development Environment
-- Run after migration: `psql -f supabase/seed.sql`
-- Or paste into Supabase SQL Editor
-- ============================================================================

-- Create extension for trigram search (run separately if needed)
-- create extension if not exists "pg_trgm";

-- ============================================================================
-- 1. Seed auth.users (via Supabase Auth API)
-- In production, users register through the app.
-- For local dev, create users through Supabase Auth UI or API first,
-- then profiles are auto-created by the trigger.
-- ============================================================================

-- 2. Seed courses
insert into public.courses (id, title, description, teacher_id, category, difficulty) values
  (gen_random_uuid(), 'Introduction to Web Development',
   'Learn HTML, CSS, and JavaScript from scratch. Build your first website.',
   (select id from public.profiles where role = 'teacher' limit 1),
   'Web Development', 'beginner'),
  (gen_random_uuid(), 'Advanced React Patterns',
   'Deep dive into compound components, render props, hooks, and state management.',
   (select id from public.profiles where role = 'teacher' limit 1),
   'Web Development', 'advanced'),
  (gen_random_uuid(), 'Python for Data Science',
   'NumPy, Pandas, Matplotlib, and machine learning fundamentals.',
   (select id from public.profiles where role = 'teacher' limit 1),
   'Data Science', 'intermediate'),
  (gen_random_uuid(), 'UI/UX Design Principles',
   'Color theory, typography, layout, and user research methods.',
   (select id from public.profiles where role = 'teacher' limit 1),
   'Design', 'beginner'),
  (gen_random_uuid(), 'Database Design & SQL',
   'Relational databases, normalization, queries, and indexing strategies.',
   (select id from public.profiles where role = 'teacher' limit 1),
   'Data Science', 'intermediate')
on conflict do nothing;

-- 3. Seed enrollments (link students to courses)
insert into public.enrollments (user_id, course_id, progress)
select
  (select id from public.profiles where role = 'student' limit 1),
  id,
  floor(random() * 100)
from public.courses
limit 3
on conflict do nothing;
