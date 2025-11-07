 
'use client';

import React, { useState } from 'react';
import { SignInForm } from '@/components/forms/sign-in-form';
import { SignUpForm } from '@/components/forms/sign-up-form';

type AuthMode = 'signin' | 'signup';

interface AuthContainerProps {
  initialMode?: AuthMode;
}

export function AuthContainer({ initialMode = 'signin' }: AuthContainerProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  return (
    <>
      {mode === 'signin' ? (
        <SignInForm onSignUpClick={() => setMode('signup')} />
      ) : (
        <SignUpForm onSignInClick={() => setMode('signin')} />
      )}
    </>
  );
}