import { error as kitError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
  const { data: course, error: courseErr } = await supabase
    .from('courses')
    .select('*')
    .eq('id', params.id)
    .single();

  if (courseErr || !course) throw kitError(404, 'Course not found');

  const { data: profile } = await supabase
    .from('profiles')
    .select('name')
    .eq('id', course.teacher_id)
    .single();

  return { course: { ...course, teacher_name: profile?.name ?? 'Unknown' } };
};
