import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
  const { session } = await parent();
  if (session?.user?.user_metadata?.role !== 'admin') {
    throw redirect(303, '/dashboard/student');
  }
};
