import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!email || !password) {
      return fail(400, { error: 'Email and password are required', email });
    }

    const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return fail(400, { error: error.message, email });

    const role = authData.user?.user_metadata?.role ?? 'student';
    throw redirect(303, `/dashboard/${role}`);
  }
};
