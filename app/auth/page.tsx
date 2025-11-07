 
import { AuthLayout } from '@/components/features/auth/auth-layout';
import { AuthContainer } from '@/components/features/auth/auth-container';

export const metadata = {
  title: 'Authentication - Task Manager',
  description: 'Sign in or create an account to manage your tasks',
};

export default function AuthPage() {
  return (
    <AuthLayout imageUrl="/auth.jpg">
      <AuthContainer initialMode="signin" />
    </AuthLayout>
  );
}