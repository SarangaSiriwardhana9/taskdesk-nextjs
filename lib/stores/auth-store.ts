import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: (user: User | null, isLoading?: boolean) => void;
  setLoading: (loading: boolean) => void;
  initialize: (user: User | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,
  initialize: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      isInitialized: true,
    }),
  setUser: (user, isLoading = false) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading,
    }),
  setLoading: (isLoading) => set({ isLoading }),
  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));

