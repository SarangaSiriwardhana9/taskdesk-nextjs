'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/lib/stores/auth-store';

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const { initialize, setUser } = useAuthStore();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    initialize(initialUser);
    initializedRef.current = true;

    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session?.user) {
            setUser({
              id: session.user.id,
              name: session.user.user_metadata?.full_name || session.user.email || 'User',
              email: session.user.email || '',
              avatar: session.user.user_metadata?.avatar_url,
            });
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [initialUser, initialize, setUser]);

  return <>{children}</>;
}