'use client';

import { Header } from '@/components/features/header';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

