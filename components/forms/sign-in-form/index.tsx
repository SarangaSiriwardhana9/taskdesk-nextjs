'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { AuthFormField } from '@/components/features/auth/auth-form-field';
import { signInSchema, type SignInFormData } from './form-schema';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github, Chrome } from 'lucide-react';
import { signIn } from '@/lib/auth/actions';
import { useAuthStore } from '@/lib/stores/auth-store';
import { createClient } from '@/lib/supabase/client';
import { ROUTES } from '@/lib/constants/routes';
import { TOAST_MESSAGES } from '@/lib/constants/toast-messages';

interface SignInFormProps {
  onSignUpClick?: () => void;
}

export function SignInForm({ onSignUpClick }: SignInFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmitForm = async (data: SignInFormData) => {
    setIsLoading(true);

    try {
      const result = await signIn(data);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      if (result?.success) {
        toast.success(TOAST_MESSAGES.AUTH.SIGN_IN_SUCCESS);

        const supabase = createClient();
        const { data: { user: sessionUser } } = await supabase.auth.getUser();

        if (sessionUser) {
          setUser({
            id: sessionUser.id,
            name: sessionUser.user_metadata?.full_name || sessionUser.email || 'User',
            email: sessionUser.email || '',
            avatar: sessionUser.user_metadata?.avatar_url,
          });
        }

        setTimeout(() => {
          router.push(result.redirect || ROUTES.HOME);
        }, 100);
      }
    } catch (error) {
      toast.error(TOAST_MESSAGES.AUTH.SIGN_IN_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-xl border border-border shadow-2xl shadow-primary/5">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 -z-10 blur-xl" />

        <div className="mb-8 text-center space-y-2">
          <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <div className="space-y-3 mb-6">
          <Button type="button" variant="social" size="auth" className="w-full" disabled={isLoading}>
            <Chrome className="h-5 w-5" />
            <span>Continue with Google</span>
          </Button>
          <Button type="button" variant="social" size="auth" className="w-full" disabled={isLoading}>
            <Github className="h-5 w-5" />
            <span>Continue with GitHub</span>
          </Button>
        </div>

        <div className="relative my-6">
          <Separator className="bg-border/50" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
            or continue with email
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5">
          <AuthFormField
            label="Email Address"
            icon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
          >
            <Input
              type="email"
              placeholder="you@example.com"
              variant="auth"
              inputSize="auth"
              {...register('email')}
              className="pl-10"
              disabled={isLoading}
            />
          </AuthFormField>

          <AuthFormField
            label="Password"
            icon={<Lock className="h-4 w-4" />}
            error={errors.password?.message}
            action={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          >
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              variant="auth"
              inputSize="auth"
              {...register('password')}
              className="pl-10"
              disabled={isLoading}
            />
          </AuthFormField>

          <div className="flex justify-end">
            <button type="button" className="text-xs font-medium text-primary hover:underline">
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="gradient"
             
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" variant="foreground" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              onClick={onSignUpClick}
              className="font-semibold text-primary hover:underline transition-colors"
              disabled={isLoading}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" />
          <span>Secure</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
        <div>Privacy Protected</div>
        <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
        <div>Encrypted</div>
      </div>
    </div>
  );
}