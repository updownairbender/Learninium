import { redirect } from '@sveltejs/kit';
import type { Session } from '@supabase/supabase-js';
import type { Role } from '$lib/types/app';

export function requireAuth(session: Session | null): asserts session is Session {
  if (!session) {
    throw redirect(303, '/auth/login');
  }
}

export function requireRole(session: Session | null, role: Role) {
  requireAuth(session);
  if (session.user.user_metadata?.role !== role) {
    throw redirect(303, '/');
  }
}
