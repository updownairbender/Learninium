import { error as kitError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('id', params.id)
    .single();

  if (courseError || !course) {
    throw kitError(404, 'Course not found');
  }

  const { data: teacher } = await supabase
    .from('profiles')
    .select('name, avatar_url')
    .eq('id', course.teacher_id)
    .single();

  return { course: { ...course, teacher_name: teacher?.name ?? 'Unknown' } };
};
