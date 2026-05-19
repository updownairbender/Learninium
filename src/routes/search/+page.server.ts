import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  const q = url.searchParams.get('q') ?? '';
  const category = url.searchParams.get('category') ?? '';

  let query = supabase.from('courses').select('id, title, difficulty, category, teacher_id');

  if (q) query = query.ilike('title', `%${q}%`);
  if (category) query = query.eq('category', category);

  const { data: courses } = await query.limit(50);

  const { data: categories } = await supabase
    .from('courses')
    .select('category')
    .not('category', 'is', null);

  const uniqueCategories = [...new Set((categories ?? []).map(c => c.category).filter(Boolean))];

  return { courses: courses ?? [], categories: uniqueCategories, q, category };
};
