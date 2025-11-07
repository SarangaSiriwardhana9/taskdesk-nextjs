'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { AuthUser, AuthState } from '@/types/auth.types';

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          setState({ user: null, loading: false, error: { message: error.message } });
          return;
        }

        setState({ user: user as AuthUser, loading: false, error: null });
      } catch (error) {
        setState({
          user: null,
          loading: false,
          error: { message: 'Failed to fetch user' },
        });
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user as AuthUser | null,
        loading: false,
        error: null,
      });
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return state;
}

