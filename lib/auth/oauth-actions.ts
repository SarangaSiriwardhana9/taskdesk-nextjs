'use client';

import { createClient } from '@/lib/supabase/client';
import { toastVariants } from '@/lib/utils/toast';

export type OAuthProvider = 'google' | 'github';

export interface OAuthOptions {
  redirectTo?: string;
  scopes?: string;
}

export async function signInWithOAuth(
  provider: OAuthProvider,
  options?: OAuthOptions
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: options?.redirectTo || `${window.location.origin}/auth/callback`,
        scopes: options?.scopes,
      }
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: `Failed to sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`
    };
  }
}

export async function handleOAuthSignIn(
  provider: OAuthProvider,
  setLoading: (loading: boolean) => void,
  options?: OAuthOptions
) {
  setLoading(true);

  try {
    const result = await signInWithOAuth(provider, options);

    if (!result.success && result.error) {
      toastVariants.error(result.error);
    }

    return result;
  } finally {
    setLoading(false);
  }
}