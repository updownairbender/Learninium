import { error as kitError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .single();

  if (profileError || !profile) {
    throw kitError(404, 'Teacher not found');
  }

  const { data: courses } = await supabase
    .from('courses')
    .select('id, title, difficulty, category')
    .eq('teacher_id', params.id);

  return { teacher: profile, courses: courses ?? [] };
};
