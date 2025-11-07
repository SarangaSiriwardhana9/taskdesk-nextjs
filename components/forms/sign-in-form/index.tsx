 
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthFormField } from '@/components/features/auth/auth-form-field';
import { signInSchema, type SignInFormData } from './form-schema';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface SignInFormProps {
  onSignUpClick?: () => void;
  onSubmit?: (data: SignInFormData) => void;
}

export function SignInForm({ onSignUpClick, onSubmit }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmitForm = (data: SignInFormData) => {
    onSubmit?.(data);
    console.log('Sign In data:', data);
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome Back
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        {/* Email Field */}
        <AuthFormField
          label="Email Address"
          icon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
        >
          <Input
            type="email"
            placeholder="you@example.com"
            {...register('email')}
            className="pl-10"
          />
        </AuthFormField>

        {/* Password Field */}
        <AuthFormField
          label="Password"
          icon={<Lock className="h-4 w-4" />}
          error={errors.password?.message}
          action={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        >
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password')}
            className="pl-10"
          />
        </AuthFormField>

        {/* Submit Button */}
        <Button type="submit" className="w-full gap-2 h-10" size="default">
          Sign In
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      {/* Mode Toggle */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            onClick={onSignUpClick}
            className="font-semibold text-primary hover:underline transition-colors"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}