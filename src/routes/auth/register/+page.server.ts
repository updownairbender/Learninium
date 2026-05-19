import { fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!email || !password) {
      return fail(400, { error: 'Email and password are required', email });
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role: 'student' } }
    });

    if (error) return fail(400, { error: error.message, email });

    return { success: true, email };
  }
};
