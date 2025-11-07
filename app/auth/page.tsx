'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/features/auth/auth-layout';
import { AuthContainer } from '@/components/features/auth/auth-container';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Spinner } from '@/components/ui/spinner';

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/tasks');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <AuthLayout imageUrl="/auth.jpg">
        <AuthContainer initialMode="signin" />
      </AuthLayout>
    </div>
  );
}