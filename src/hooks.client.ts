import { supabase } from '$lib/client/db';
import type { HandleClientError } from '@sveltejs/kit';

export { supabase };

export const handleError: HandleClientError = ({ error }) => {
  console.error('Client error:', error);
};

export const init = () => {};
