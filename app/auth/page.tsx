'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/features/auth/auth-layout';
import { AuthContainer } from '@/components/features/auth/auth-container';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Spinner } from '@/components/ui/spinner';
import { ROUTES } from '@/lib/constants/routes';

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated && !isRedirecting) {
      setIsRedirecting(true);
      router.replace(ROUTES.TASKS);
    }
  }, [isAuthenticated, isLoading, isRedirecting, router]);

  if (isLoading || isRedirecting) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner />
          {isRedirecting && (
            <p className="text-sm text-muted-foreground">Redirecting...</p>
          )}
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <AuthLayout imageUrl="/auth.jpg">
        <AuthContainer initialMode="signin" />
      </AuthLayout>
    </div>
  );
}