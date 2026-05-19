import type { SupabaseClient } from '@supabase/supabase-js';

export function createDb(client: SupabaseClient) {
  return { client };
}
