'use client';

import {
  useAuthStore,
  useAuthUser,
  useAuthLoading,
  useIsAuthenticated,
} from '@/lib/stores/auth-store';

export function useAuth() {
  const user = useAuthUser();
  const isLoading = useAuthLoading();
  const isAuthenticated = useIsAuthenticated();

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}