import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  
  initialize: (user: User | null) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector((set) => ({
    user: null,
    isLoading: true,

    initialize: (user) =>
      set({
        user,
        isLoading: false,
      }),

    setUser: (user) =>
      set({
        user,
        isLoading: false,
      }),

    clearAuth: () =>
      set({
        user: null,
        isLoading: false,
      }),
  }))
);

export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useIsAuthenticated = () => useAuthStore((state) => !!state.user);