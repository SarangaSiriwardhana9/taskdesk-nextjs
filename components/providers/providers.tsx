'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { AuthProvider } from './auth-provider';

interface ProvidersProps {
  children: React.ReactNode;
  initialUser: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

export function Providers({ children, initialUser }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider initialUser={initialUser}>
        {children}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}