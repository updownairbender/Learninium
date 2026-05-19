import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  const q = url.searchParams.get('q') ?? '';
  const category = url.searchParams.get('category') ?? '';

  let query = supabase.from('courses').select('id, title, difficulty, category, teacher_id');

  if (q) query = query.ilike('title', `%${q}%`);
  if (category) query = query.eq('category', category);

  const { data: courses } = await query.limit(50);

  const { data: cats } = await supabase
    .from('courses')
    .select('category')
    .not('category', 'is', null);

  const uniqueCategories: string[] = [];
  const seen = new Set<string>();
  for (const c of cats ?? []) {
    const cat = (c as any).category;
    if (cat && !seen.has(cat)) {
      seen.add(cat);
      uniqueCategories.push(cat);
    }
  }

  return { courses: courses ?? [], categories: uniqueCategories, q, category };
};
