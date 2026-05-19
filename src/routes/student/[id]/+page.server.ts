import { error as kitError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
  const { data: profile, error: profileErr } = await supabase
    .from('profiles')
    .select('name, bio')
    .eq('id', params.id)
    .single();

  if (profileErr || !profile) throw kitError(404, 'Student not found');

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('course_id, progress')
    .eq('user_id', params.id);

  const enrolled = (enrollments ?? []).map((e: any) => ({
    course_id: e.course_id,
    progress: e.progress,
    course_title: 'Course ' + (e.course_id?.slice(0, 8) ?? 'Unknown')
  }));

  return { student: profile, enrollments: enrolled };
};
