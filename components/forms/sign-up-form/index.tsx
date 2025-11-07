'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import { AuthFormField } from '@/components/features/auth/auth-form-field';
import { signUpSchema, type SignUpFormData } from './form-schema';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Github, Chrome, Sparkles } from 'lucide-react';
import { signUp } from '@/lib/auth/actions';

interface SignUpFormProps {
  onSignInClick?: () => void;
  onSubmit?: (data: SignUpFormData) => void;
}

export function SignUpForm({ onSignInClick, onSubmit }: SignUpFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmitForm = async (data: SignUpFormData) => {
    if (!agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    setIsLoading(true);
    
    try {
      const result = await signUp(data);
      
      if (result?.error) {
        toast.error(result.error);
        setIsLoading(false);
        return;
      }
      
      if (result?.success) {
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.success('Successfully signed up!');
        }
        if (result.redirect) {
          setTimeout(() => {
            router.push(result.redirect!);
            router.refresh();
          }, 300);
        }
        return;
      }
    } catch (error) {
      toast.error('An error occurred during sign up');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-xl border border-border shadow-2xl shadow-primary/5">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 -z-10 blur-xl" />
        
        <div className="mb-8 text-center space-y-2">
          <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
          Create Account
        </h1>
          <p className="text-sm text-muted-foreground">
          Join us and start managing your tasks efficiently
        </p>
      </div>

        <div className="space-y-3 mb-6">
          <Button type="button" variant="social" size="auth" disabled={isLoading}>
            <Chrome className="h-5 w-5" />
            <span>Continue with Google</span>
          </Button>
          <Button type="button" variant="social" size="auth" disabled={isLoading}>
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

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <AuthFormField
          label="Full Name"
          icon={<User className="h-4 w-4" />}
          error={errors.name?.message}
        >
          <Input
            placeholder="John Doe"
              variant="auth"
              inputSize="auth"
            {...register('name')}
            className="pl-10"
              disabled={isLoading}
          />
        </AuthFormField>

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

        <AuthFormField
          label="Confirm Password"
          icon={<Lock className="h-4 w-4" />}
          error={errors.confirmPassword?.message}
          action={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
            >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        >
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
              variant="auth"
              inputSize="auth"
            {...register('confirmPassword')}
            className="pl-10"
              disabled={isLoading}
          />
        </AuthFormField>

          <div className="flex items-start gap-3 pt-2">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
              className="mt-0.5"
            />
            <label
              htmlFor="terms"
              className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
            >
              I agree to the{' '}
              <button type="button" className="text-primary hover:underline font-medium">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-primary hover:underline font-medium">
                Privacy Policy
              </button>
            </label>
          </div>

          <Button
            type="submit"
            variant="gradient"
            size="auth"
            className="w-full mt-6"
            disabled={isLoading || !agreeToTerms}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" variant="foreground" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            onClick={onSignInClick}
            className="font-semibold text-primary hover:underline transition-colors"
              disabled={isLoading}
          >
            Sign In
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