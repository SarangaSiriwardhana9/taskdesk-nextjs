 'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SignInForm } from '@/components/forms/sign-in-form';
import { SignUpForm } from '@/components/forms/sign-up-form';
import { ROUTES } from '@/lib/constants/routes';

type AuthMode = 'signin' | 'signup';

interface AuthContainerProps {
  initialMode?: AuthMode;
}

export function AuthContainer({ initialMode = 'signin' }: AuthContainerProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleModeChange = (newMode: AuthMode) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMode(newMode);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  return (
    <div className="w-full max-w-md">
      <div
        className={`transition-all duration-200 ${
          isTransitioning
            ? 'opacity-0 scale-95 blur-sm'
            : 'opacity-100 scale-100 blur-0'
        }`}
      >
        {mode === 'signin' ? (
          <SignInForm onSignUpClick={() => handleModeChange('signup')} />
        ) : (
          <SignUpForm onSignInClick={() => handleModeChange('signin')} />
        )}
      </div>
      
    </div>
  );
}