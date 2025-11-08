'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Header } from '@/components/features/header';
import { Footer } from '@/components/features/home/footer';
import { useIsAuthenticated, useAuthLoading } from '@/lib/stores/auth-store';
import { Spinner } from '@/components/ui/spinner';
import { ROUTES } from '@/lib/constants/routes';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useAuthLoading();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/') {
      // Store the intended destination for redirect after login
      sessionStorage.setItem('redirectAfterLogin', pathname);
      router.push(ROUTES.AUTH);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/') {
    return null;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}