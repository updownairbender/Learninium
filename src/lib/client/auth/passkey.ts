import { supabase } from '$lib/client/db';

export function isPasskeySupported(): boolean {
  return typeof window !== 'undefined'
    && typeof window.PublicKeyCredential !== 'undefined';
}

export async function checkPasskeyPreference(): Promise<boolean> {
  if (!isPasskeySupported()) return false;
  return PublicKeyCredential.isConditionalMediationAvailable();
}

export async function registerPasskey() {
  return supabase.auth.registerPasskey();
}

export async function signInWithPasskey() {
  return supabase.auth.signInWithPasskey();
}
