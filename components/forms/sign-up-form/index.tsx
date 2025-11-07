 
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthFormField } from '@/components/features/auth/auth-form-field';
import { signUpSchema, type SignUpFormData } from './form-schema';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface SignUpFormProps {
  onSignInClick?: () => void;
  onSubmit?: (data: SignUpFormData) => void;
}

export function SignUpForm({ onSignInClick, onSubmit }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmitForm = (data: SignUpFormData) => {
    onSubmit?.(data);
    console.log('Sign Up data:', data);
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create Account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Join us and start managing your tasks efficiently
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        {/* Name Field */}
        <AuthFormField
          label="Full Name"
          icon={<User className="h-4 w-4" />}
          error={errors.name?.message}
        >
          <Input
            placeholder="John Doe"
            {...register('name')}
            className="pl-10"
          />
        </AuthFormField>

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

        {/* Confirm Password Field */}
        <AuthFormField
          label="Confirm Password"
          icon={<Lock className="h-4 w-4" />}
          error={errors.confirmPassword?.message}
          action={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        >
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('confirmPassword')}
            className="pl-10"
          />
        </AuthFormField>

        {/* Submit Button */}
        <Button type="submit" className="w-full gap-2 h-10" size="default">
          Create Account
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      {/* Mode Toggle */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            onClick={onSignInClick}
            className="font-semibold text-primary hover:underline transition-colors"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}