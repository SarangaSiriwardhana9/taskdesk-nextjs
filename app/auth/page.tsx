 import { AuthLayout } from '@/components/features/auth/auth-layout';
import { AuthContainer } from '@/components/features/auth/auth-container';
import { Header } from '@/components/features/header';

export const metadata = {
  title: 'Authentication - TaskDesk',
  description: 'Sign in or create an account to manage your tasks',
};

export default function AuthPage() {
  return (
    <>
      <Header isAuthenticated={false} />
      <AuthLayout imageUrl="/auth.jpg">
        <AuthContainer initialMode="signin" />
      </AuthLayout>
    </>
  );
}