import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase }, url }) => {
  const code = url.searchParams.get('code');

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    const role = session.user.user_metadata?.role ?? 'student';
    throw redirect(303, `/dashboard/${role}`);
  }

  throw redirect(303, '/auth/login');
};
