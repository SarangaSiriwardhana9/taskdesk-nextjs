'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster />
    </NextThemesProvider>
  );
}

