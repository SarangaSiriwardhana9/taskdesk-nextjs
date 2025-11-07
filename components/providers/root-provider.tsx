'use client';

import { ThemeProvider } from './theme-provider';
import { AuthProvider } from './auth-provider';

interface RootProviderProps {
  children: React.ReactNode;
  initialUser: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

export function RootProvider({ children, initialUser }: RootProviderProps) {
  return (
    <ThemeProvider>
      <AuthProvider initialUser={initialUser}>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}

