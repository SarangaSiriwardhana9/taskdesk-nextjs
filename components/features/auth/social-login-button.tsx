'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface SocialLoginButtonProps {
  provider: 'google' | 'github' | 'apple' | 'microsoft';
  icon: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
}

export function SocialLoginButton({
  provider,
  icon: Icon,
  onClick,
  disabled = false,
}: SocialLoginButtonProps) {
  const providerNames = {
    google: 'Google',
    github: 'GitHub',
    apple: 'Apple',
    microsoft: 'Microsoft',
  };

  return (
    <Button
      type="button"
      variant="social"
      size="auth"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-5 w-5" />
      <span>Continue with {providerNames[provider]}</span>
    </Button>
  );
}

