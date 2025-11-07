
# Directory Structure
```
.cursorrules
app/auth/page.tsx
app/layout.tsx
app/page.tsx
app/profile/page.tsx
app/tasks/page.tsx
components/features/auth/auth-container.tsx
components/features/auth/auth-error-alert.tsx
components/features/auth/auth-form-field.tsx
components/features/auth/auth-layout.tsx
components/features/auth/index.ts
components/features/auth/password-strength.tsx
components/features/auth/social-login-button.tsx
components/features/header/header.tsx
components/features/header/index.ts
components/features/header/user-menu.tsx
components/features/theme/theme-toggle.tsx
components/forms/profile-form/form-schema.ts
components/forms/profile-form/index.tsx
components/forms/sign-in-form/form-schema.ts
components/forms/sign-in-form/index.tsx
components/forms/sign-up-form/form-schema.ts
components/forms/sign-up-form/index.tsx
components/layout/app-layout.tsx
components/providers/auth-provider.tsx
components/providers/root-provider.tsx
components/providers/theme-provider.tsx
components/ui/spinner.tsx
lib/auth/actions.ts
lib/auth/server-utils.ts
lib/constants/config.ts
lib/constants/index.ts
lib/constants/routes.ts
lib/constants/toast-messages.ts
lib/hooks/use-auth.tsx
lib/stores/auth-store.ts
lib/supabase/client.ts
lib/supabase/middleware.ts
lib/supabase/server.ts
lib/utils.ts
middleware.ts
types/auth.types.ts
types/view-transitions.d.ts
```

# Files

## File: components/features/auth/auth-error-alert.tsx
````typescript
'use client';

import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface AuthErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export function AuthErrorAlert({ message, onClose }: AuthErrorAlertProps) {
  return (
    <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-destructive" />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="text-sm font-semibold text-destructive">
            Authentication Error
          </h3>
          <p className="text-sm text-foreground/80">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-lg p-1 hover:bg-destructive/20 transition-colors"
          >
            <X className="h-4 w-4 text-destructive" />
          </button>
        )}
      </div>
    </div>
  );
}
````

## File: components/features/auth/auth-form-field.tsx
````typescript
'use client';

import React, { ReactNode } from 'react';

interface AuthFormFieldProps {
  label: string;
  icon?: ReactNode;
  error?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function AuthFormField({
  label,
  icon,
  error,
  action,
  children,
}: AuthFormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </div>
        )}
        {children}
        {action && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {action}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
}
````

## File: components/features/auth/index.ts
````typescript
export { AuthLayout } from './auth-layout';
export { AuthContainer } from './auth-container';
export { AuthFormField } from './auth-form-field';
export { PasswordStrength } from './password-strength';
export { SocialLoginButton } from './social-login-button';
export { AuthErrorAlert } from './auth-error-alert';
````

## File: components/features/auth/password-strength.tsx
````typescript
'use client';

import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const requirements = [
    { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
    { label: 'Contains uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'Contains lowercase letter', test: (p: string) => /[a-z]/.test(p) },
    { label: 'Contains number', test: (p: string) => /[0-9]/.test(p) },
  ];

  const strength = requirements.filter((req) => req.test(password)).length;
  const percentage = (strength / requirements.length) * 100;

  const getStrengthColor = () => {
    if (strength === 0) return 'bg-border';
    if (strength <= 1) return 'bg-destructive';
    if (strength <= 2) return 'bg-yellow-500';
    if (strength <= 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (strength === 0) return '';
    if (strength <= 1) return 'Weak';
    if (strength <= 2) return 'Fair';
    if (strength <= 3) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="space-y-3 mt-2">
      {/* Strength Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Password strength</span>
          {strength > 0 && (
            <span className="font-medium text-foreground">{getStrengthLabel()}</span>
          )}
        </div>
        <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-1.5">
        {requirements.map((req, index) => {
          const isMet = req.test(password);
          return (
            <div
              key={index}
              className="flex items-center gap-2 text-xs"
            >
              {isMet ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
              ) : (
                <XCircle className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
              )}
              <span
                className={
                  isMet
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                }
              >
                {req.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
````

## File: components/features/auth/social-login-button.tsx
````typescript
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
````

## File: components/features/header/index.ts
````typescript
export { Header } from './header';
export { UserMenu } from './user-menu';
````

## File: components/forms/profile-form/form-schema.ts
````typescript
import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
````

## File: components/forms/sign-in-form/form-schema.ts
````typescript
import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export type SignInFormData = z.infer<typeof signInSchema>;
````

## File: components/forms/sign-up-form/form-schema.ts
````typescript
import { z } from 'zod';


export const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});


export type SignUpFormData = z.infer<typeof signUpSchema>;
````

## File: components/layout/app-layout.tsx
````typescript
'use client';

import { Header } from '@/components/features/header';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
````

## File: components/providers/root-provider.tsx
````typescript
'use client';

import { ThemeProvider } from './theme-provider';
import { AuthProvider } from './auth-provider';

interface RootProviderProps {
  children: React.ReactNode;
  initialUser: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

export function RootProvider({ children, initialUser }: RootProviderProps) {
  return (
    <ThemeProvider>
      <AuthProvider initialUser={initialUser}>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
````

## File: components/providers/theme-provider.tsx
````typescript
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster />
    </NextThemesProvider>
  );
}
````

## File: components/ui/spinner.tsx
````typescript
import { cn } from '@/lib/utils';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'foreground';
}

export function Spinner({ className, size = 'default', variant = 'default' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const variantClasses = {
    default: 'border-primary/30 border-t-primary',
    foreground: 'border-primary-foreground/30 border-t-primary-foreground',
  };

  return (
    <div
      className={cn(
        'border-2 rounded-full animate-spin',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    />
  );
}
````

## File: lib/auth/server-utils.ts
````typescript
import { createClient } from '@/lib/supabase/server';

export async function getServerUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.user_metadata?.full_name || user.email || 'User',
      email: user.email || '',
      avatar: user.user_metadata?.avatar_url,
    };
  } catch (error) {
    return null;
  }
}
````

## File: lib/constants/config.ts
````typescript
export const CONFIG = {
  REDIRECT_DELAY: 300,
  HEADER_SCROLL_THRESHOLD: 20,
} as const;
````

## File: lib/constants/index.ts
````typescript
export { ROUTES } from './routes';
export { TOAST_MESSAGES } from './toast-messages';
export { CONFIG } from './config';
````

## File: lib/constants/routes.ts
````typescript
export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  TASKS: '/tasks',
  PROFILE: '/profile',
} as const;
````

## File: lib/constants/toast-messages.ts
````typescript
export const TOAST_MESSAGES = {
  AUTH: {
    SIGN_IN_SUCCESS: 'Successfully signed in!',
    SIGN_UP_SUCCESS: 'Successfully signed up!',
    SIGN_UP_EMAIL_CONFIRMATION: 'Success! Please check your email to confirm your account before signing in.',
    SIGN_IN_ERROR: 'An error occurred during sign in',
    SIGN_UP_ERROR: 'An error occurred during sign up',
    TERMS_REQUIRED: 'Please agree to the terms and conditions',
  },
  PROFILE: {
    UPDATE_SUCCESS: 'Profile updated successfully!',
    UPDATE_ERROR: 'Failed to update profile',
  },
} as const;
````

## File: lib/hooks/use-auth.tsx
````typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { AuthUser, AuthState } from '@/types/auth.types';

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          setState({ user: null, loading: false, error: { message: error.message } });
          return;
        }

        setState({ user: user as AuthUser, loading: false, error: null });
      } catch (error) {
        setState({
          user: null,
          loading: false,
          error: { message: 'Failed to fetch user' },
        });
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user as AuthUser | null,
        loading: false,
        error: null,
      });
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return state;
}
````

## File: lib/supabase/client.ts
````typescript
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
````

## File: lib/supabase/server.ts
````typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server component
          }
        },
      },
    }
  );
}
````

## File: lib/utils.ts
````typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
````

## File: middleware.ts
````typescript
import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
````

## File: types/auth.types.ts
````typescript
import { User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: AuthError | null;
}

export interface AuthResponse {
  error?: string;
  success?: boolean;
  message?: string;
  redirect?: string;
}
````

## File: types/view-transitions.d.ts
````typescript
interface Document {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    ready: Promise<void>;
    finished: Promise<void>;
    updateCallbackDone: Promise<void>;
  };
}
````

## File: .cursorrules
````
# TaskDesk Project - Cursor Rules

## Project Overview
TaskDesk is a modern task management application built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Themes**: next-themes (light/dark mode)
- **State Management**: Zustand
- **Notifications**: Sonner
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)

## Core Principles

### 1. Component Variants Over Hardcoded Styles
- **NEVER** use hardcoded className strings for repeated patterns
- **ALWAYS** create variants in base components using `class-variance-authority`
- **ALWAYS** use semantic variant names (e.g., `social`, `auth`, `gradient`)

### 2. Type Safety
- **ALWAYS** use TypeScript for all files
- **ALWAYS** define proper interfaces for component props
- **ALWAYS** use `VariantProps` for variant-based components
- **NEVER** use `any` type

### 3. Code Style
- **NEVER** include comments in production code
- **ALWAYS** use descriptive variable and function names
- **ALWAYS** keep code clean and self-documenting
- **ALWAYS** remove console.logs before committing (except intentional logging)

### 4. File Organization
- Components in `components/` organized by type:
  - `components/ui/` - Base UI components (shadcn)
  - `components/features/` - Feature-specific components
  - `components/forms/` - Form components
  - `components/providers/` - Context providers (Theme, Auth, Root)
  - `components/layout/` - Layout components
- Constants in `lib/constants/`:
  - `routes.ts` - Application routes
  - `toast-messages.ts` - Toast notification messages
  - `config.ts` - Configuration values (delays, thresholds, etc.)
  - `index.ts` - Central export for all constants
- Each feature folder should have an `index.ts` for exports
- Keep related files together

### 5. Constants Usage
- **ALWAYS** use constants for routes, toast messages, and configuration values
- **ALWAYS** import constants from `@/lib/constants`
- **NEVER** hardcode routes, messages, or config values
- Use constants for values used in 2+ places or likely to change

## UI Component Patterns

### Button Variants

```tsx
// ✅ CORRECT - Use variants
<Button variant="social" size="auth">
  <Icon />
  <span>Text</span>
</Button>

<Button variant="gradient" size="auth" className="w-full">
  Submit
</Button>

// ❌ WRONG - Don't hardcode styles
<Button className="border bg-background shadow-xs border-border/50 hover:border-primary/50 hover:bg-primary/5">
```

**Available Button Variants:**
- `default` - Primary button (bg-primary)
- `destructive` - Destructive actions
- `outline` - Outlined button
- `secondary` - Secondary actions
- `ghost` - Ghost button
- `link` - Link style
- `social` - Social login buttons (Google, GitHub, etc.)
- `gradient` - Gradient primary actions (from-primary to-accent)

**Available Button Sizes:**
- `default` - 36px height
- `sm` - 32px height
- `lg` - 40px height
- `auth` - 44px height (for auth forms)
- `icon` - Square icon buttons

### Input Variants

```tsx
// ✅ CORRECT - Use variants
<Input variant="auth" inputSize="auth" />

// ❌ WRONG - Don't hardcode styles
<Input className="h-11 bg-background/50" />
```

**Available Input Variants:**
- `default` - Standard transparent background
- `auth` - Auth form inputs (bg-background/50)

**Available Input Sizes:**
- `default` - 36px height
- `auth` - 44px height (matches auth buttons)

### Creating New Variants

When you need a new pattern used in 2+ places:

1. Add variant to base component:
```tsx
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        newVariant: "specific-styles",
      },
    },
  }
)
```

2. Use the variant:
```tsx
<Button variant="newVariant">Click</Button>
```

## Authentication UI Patterns

### Auth Layout Structure
```tsx
<AuthLayout>
  <AuthContainer initialMode="signin" />
</AuthLayout>
```

### Auth Forms
- Use `AuthFormField` wrapper for form fields
- Include icons from lucide-react
- Use `variant="auth"` and `inputSize="auth"` for inputs
- Use `variant="social"` and `size="auth"` for social buttons
- Use `variant="gradient"` and `size="auth"` for submit buttons

### Example Auth Form Field
```tsx
<AuthFormField
  label="Email Address"
  icon={<Mail className="h-4 w-4" />}
  error={errors.email?.message}
>
  <Input
    type="email"
    variant="auth"
    inputSize="auth"
    {...register('email')}
    className="pl-10"
  />
</AuthFormField>
```

## Styling Guidelines

### Theme Variables
- Use CSS variables for colors: `var(--foreground)`, `var(--background)`, etc.
- **NEVER** hardcode color values
- Support both light and dark modes

### Hover States
- Ensure hover states work in both light and dark modes
- Use `!important` flags when necessary to override conflicting styles
- Test all interactive elements in both themes

### Focus States
- Input focus: `focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20`
- Button focus: `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]`

### Transitions
- Use `transition-all` for smooth state changes
- Use `transition-colors` for color-only changes
- Use `transition-opacity` for opacity changes
- Add `duration-200` or `duration-300` for custom timing

## Form Patterns

### Form Validation
- Use Zod schemas for validation
- Define schemas in separate `form-schema.ts` files
- Use React Hook Form with `zodResolver`

### Form State Management
```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(formSchema),
});
```

### Loading States
- Always disable buttons during loading
- Show loading spinner with appropriate text
- Disable form inputs during submission

### Loading States with Spinner Component
```tsx
import { Spinner } from '@/components/ui/spinner';

<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Spinner size="sm" variant="foreground" />
      <span>Loading...</span>
    </>
  ) : (
    <>
      <span>Submit</span>
      <ArrowRight className="h-4 w-4" />
    </>
  )}
</Button>
```

**Spinner Component:**
- Located in `components/ui/spinner.tsx`
- Sizes: `sm`, `default`, `lg`
- Variants: `default` (primary colors), `foreground` (primary-foreground for buttons)
- **ALWAYS** use this component instead of inline spinner markup

## Animation Guidelines

### Custom Animations
Define in `globals.css` under `@layer utilities`:

```css
@keyframes animationName {
  0%, 100% { /* styles */ }
  50% { /* styles */ }
}

.animate-animationName {
  animation: animationName 3s ease infinite;
}
```

### Animation Classes
- Use Tailwind's built-in: `animate-spin`, `animate-pulse`, `animate-ping`
- Custom delays: `.delay-500`, `.delay-1000`
- Custom gradient: `.animate-gradient`

## Global CSS Structure

```css
@layer base {
  /* Base element styles */
}

@layer utilities {
  /* Custom utilities and animations */
}

@layer components {
  /* Component-specific overrides */
}
```

## Import Organization

```tsx
// 1. External libraries
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// 2. UI components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

// 3. Feature components
import { AuthFormField } from '@/components/features/auth/auth-form-field';

// 4. Constants
import { ROUTES } from '@/lib/constants/routes';
import { TOAST_MESSAGES } from '@/lib/constants/toast-messages';
import { CONFIG } from '@/lib/constants/config';

// 5. Utils and schemas
import { signInSchema, type SignInFormData } from './form-schema';

// 6. Icons
import { Mail, Lock, Eye } from 'lucide-react';
```

## Component Structure

```tsx
'use client'; // Only if using client-side features

import statements...

interface ComponentProps {
  // Props definition
}

export function Component({ prop1, prop2 }: ComponentProps) {
  const [state, setState] = useState();
  
  const handleAction = () => {
    // Handler logic
  };
  
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

## Naming Conventions

### Files
- Components: PascalCase (e.g., `AuthLayout.tsx`)
- Utils: kebab-case (e.g., `form-schema.ts`)
- Types: PascalCase with `.types.ts` suffix

### Components
- PascalCase: `AuthFormField`, `SignInForm`
- Descriptive names that indicate purpose

### Variables
- camelCase: `isLoading`, `handleSubmit`
- Boolean prefix: `is`, `has`, `should`
- Handlers prefix: `handle`, `on`

### Constants
- **ALWAYS** use constants from `lib/constants/` folder
- Import from `@/lib/constants` (uses index.ts barrel export)
- Constants are organized by type (routes, toast-messages, config)
- Use constants for:
  - Routes: `ROUTES.AUTH`, `ROUTES.TASKS`, etc.
  - Toast messages: `TOAST_MESSAGES.AUTH.SIGN_IN_SUCCESS`
  - Configuration: `CONFIG.REDIRECT_DELAY`, `CONFIG.HEADER_SCROLL_THRESHOLD`

## Responsive Design

### Breakpoints
- Mobile-first approach
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Test on mobile, tablet, and desktop

### Layout Patterns
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2">
  <div className="order-2 lg:order-1">Form</div>
  <div className="hidden lg:flex order-1 lg:order-2">Features</div>
</div>
```

## Accessibility

### Form Labels
- Always use labels with form inputs
- Associate labels with inputs using `htmlFor` and `id`

### Focus Management
- Ensure keyboard navigation works
- Visible focus indicators
- Use `tabIndex={-1}` for decorative interactive elements

### ARIA Attributes
- Use `aria-invalid` for form errors
- Use `disabled` attribute for disabled states

## Performance

### Optimization
- Use `React.memo` for expensive components
- Avoid unnecessary re-renders
- Use proper key props in lists
- Lazy load heavy components when appropriate

### Best Practices
- Keep component files under 300 lines
- Extract complex logic to custom hooks
- Use TypeScript for type safety
- Minimize bundle size

## Error Handling

### Form Errors
```tsx
<AuthFormField error={errors.fieldName?.message}>
  <Input {...register('fieldName')} />
</AuthFormField>
```

### User Feedback
- Show clear error messages
- Use Sonner toast notifications for success/error states
- **ALWAYS** use constants from `TOAST_MESSAGES` for toast messages
- Disable submit during validation
- Example:
```tsx
import { toast } from 'sonner';
import { TOAST_MESSAGES } from '@/lib/constants/toast-messages';

toast.success(TOAST_MESSAGES.AUTH.SIGN_IN_SUCCESS);
toast.error(TOAST_MESSAGES.AUTH.SIGN_IN_ERROR);
```

## Security

### Input Validation
- Always validate on both client and server
- Use Zod schemas for type-safe validation
- Sanitize user input
- Never trust client-side validation alone

### Authentication
- Implement proper session management
- Use secure password handling
- Add CSRF protection
- Implement rate limiting

## Git Workflow

### Commits
- Use descriptive commit messages
- Follow conventional commits format
- Keep commits focused and atomic

### Branches
- Feature branches from main
- Name format: `feature/description` or `fix/description`

## Testing Approach

### What to Test
- Component rendering
- User interactions
- Form validation
- Error states
- Loading states

### Testing Tools
- Jest for unit tests
- React Testing Library for component tests
- Playwright/Cypress for E2E tests

## Common Patterns to Follow

### 1. Consistent Width Classes
```tsx
// Auth forms and containers
<div className="w-full max-w-md">

// Auth buttons
<Button variant="social" size="auth"> // w-full in variant

// Regular content
<div className="w-full max-w-7xl">
```

### 2. Spacing Patterns
```tsx
// Vertical spacing
<div className="space-y-4">    // Small gaps
<div className="space-y-6">    // Medium gaps
<div className="space-y-8">    // Large gaps

// Padding
<div className="p-4">          // Small padding
<div className="p-6">          // Medium padding
<div className="p-8">          // Large padding
```

### 3. Card Patterns
```tsx
<div className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-xl border border-border shadow-2xl shadow-primary/5">
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 -z-10 blur-xl" />
  {/* Content */}
</div>
```

## Anti-Patterns to Avoid

### ❌ Don't Do This

```tsx
// Don't hardcode styles
<Button className="w-full gap-3 h-11 border-border/50 hover:border-primary/50">

// Don't use inline styles
<div style={{ color: 'red' }}>

// Don't use any type
const data: any = fetchData();

// Don't leave comments in production code
{/* This is a button */}
<Button>Click</Button>

// Don't use magic numbers
<div className="w-[423px] h-[156px]">
```

### ✅ Do This Instead

```tsx
// Use variants
<Button variant="social" size="auth">

// Use Tailwind classes
<div className="text-destructive">

// Use proper types
const data: UserData = fetchData();

// Self-documenting code
<Button variant="submit">Submit Form</Button>

// Use semantic sizing
<div className="w-full max-w-md">
```

## Provider Structure

### Theme Provider
- Located in `components/providers/theme-provider.tsx`
- Handles theme management (light/dark mode)
- Includes Sonner Toaster component
- Wraps NextThemesProvider

### Auth Provider
- Located in `components/providers/auth-provider.tsx`
- Manages authentication state with Zustand
- Syncs with Supabase auth state changes
- Initializes store with server-provided user data

### Root Provider
- Located in `components/providers/root-provider.tsx`
- Composes ThemeProvider and AuthProvider
- Single entry point for all providers
- Used in `app/layout.tsx`

## State Management

### Zustand Store
- Located in `lib/stores/auth-store.ts`
- Global authentication state management
- Provides: `user`, `isAuthenticated`, `isLoading`
- Actions: `setUser`, `setLoading`, `clearAuth`
- **ALWAYS** use `useAuthStore()` hook to access auth state

### Example Usage
```tsx
import { useAuthStore } from '@/lib/stores/auth-store';

const { user, isAuthenticated, isLoading } = useAuthStore();
```

## Routing and Navigation

### Routes
- **ALWAYS** use `ROUTES` constants from `@/lib/constants/routes`
- Never hardcode route paths
- Example:
```tsx
import { ROUTES } from '@/lib/constants/routes';

router.push(ROUTES.TASKS);
<Link href={ROUTES.AUTH}>Sign In</Link>
```

## Constants Usage Guidelines

### When to Use Constants
- Routes: **ALWAYS** use constants
- Toast messages: **ALWAYS** use constants
- Configuration values (delays, thresholds): **ALWAYS** use constants
- Values used in 2+ places: Use constants
- Values likely to change: Use constants

### When NOT to Use Constants
- Placeholder text in forms
- One-off UI text
- Component-specific strings
- Static content that won't change

### Example
```tsx
// ✅ CORRECT
import { ROUTES } from '@/lib/constants/routes';
import { TOAST_MESSAGES } from '@/lib/constants/toast-messages';
import { CONFIG } from '@/lib/constants/config';

router.push(ROUTES.TASKS);
toast.success(TOAST_MESSAGES.AUTH.SIGN_IN_SUCCESS);
setTimeout(() => {}, CONFIG.REDIRECT_DELAY);

// ❌ WRONG
router.push('/tasks');
toast.success('Successfully signed in!');
setTimeout(() => {}, 300);
```

## Questions or Additions?

When in doubt:
1. Check existing patterns in the codebase
2. Prioritize consistency over cleverness
3. Use variants for reusable patterns
4. Use constants for routes, messages, and config
5. Ensure dark mode compatibility
6. Test in both themes
7. Keep code clean and simple

## Version Control

This file should be updated when:
- New component variants are added
- New patterns are established
- Breaking changes are made to existing patterns
- New best practices are adopted
- New constants are added

---

**Last Updated**: December 2024
**Maintained by**: TaskDesk Development Team
````

## File: app/profile/page.tsx
````typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';
import { ProfileForm } from '@/components/forms/profile-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Calendar, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ROUTES } from '@/lib/constants/routes';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(ROUTES.AUTH);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <Spinner />
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const userData = {
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <main className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Profile Settings</h1>
              <p className="text-muted-foreground mt-2">
                Manage your account information and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="lg:sticky lg:top-24">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-lg shadow-primary/30">
                          {userData.avatar ? (
                            <img
                              src={userData.avatar}
                              alt={userData.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            getInitials(userData.name)
                          )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-background border-4 border-background flex items-center justify-center">
                          <div className="w-full h-full rounded-full bg-green-500 border-2 border-background"></div>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{userData.name}</CardTitle>
                    <CardDescription className="text-sm break-all">{userData.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground">Email</p>
                          <p className="text-muted-foreground break-all">{userData.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground">Member Since</p>
                          <p className="text-muted-foreground">
                            Recently
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <Shield className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground">Account Status</p>
                          <p className="text-muted-foreground">Verified</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <ProfileForm
                  initialData={{
                    name: userData.name,
                    email: userData.email,
                  }}
                />

                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>
                      Manage your password and security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border border-border bg-card/50">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium text-foreground">Password</p>
                            <p className="text-sm text-muted-foreground">
                              Last updated recently
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          Change Password
                        </Button>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border border-border bg-card/50">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium text-foreground">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" disabled className="w-full sm:w-auto">
                          Coming Soon
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}
````

## File: components/features/auth/auth-container.tsx
````typescript
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
````

## File: components/features/theme/theme-toggle.tsx
````typescript
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = async () => {
    if (!buttonRef.current) return;

    if (!document.startViewTransition) {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      });
    }).ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-full">
        <div className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  return (
    <Button
      ref={buttonRef}
      variant="outline"
      size="icon"
      onClick={handleThemeChange}
      className="rounded-full hover:scale-110 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-180 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-180 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
````

## File: components/forms/profile-form/index.tsx
````typescript
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { profileSchema, type ProfileFormData } from './form-schema';
import { User, Mail, Save } from 'lucide-react';
import { TOAST_MESSAGES } from '@/lib/constants/toast-messages';

interface ProfileFormProps {
  initialData: {
    name: string;
    email: string;
  };
  onSubmit?: (data: ProfileFormData) => void;
}

export function ProfileForm({ initialData, onSubmit }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  });

      const onSubmitForm = async (data: ProfileFormData) => {
        setIsLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          toast.success(TOAST_MESSAGES.PROFILE.UPDATE_SUCCESS);
          onSubmit?.(data);
        } catch (error) {
          toast.error(TOAST_MESSAGES.PROFILE.UPDATE_ERROR);
        } finally {
          setIsLoading(false);
        }
      };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and account details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name
            </label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register('name')}
              disabled={isLoading}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              disabled={isLoading}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" variant="foreground" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
````

## File: components/providers/auth-provider.tsx
````typescript
'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/lib/stores/auth-store';

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const { initialize, setUser } = useAuthStore();
  const initializedRef = useRef(false);
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);

  useEffect(() => {
    if (initializedRef.current) return;

    initialize(initialUser);
    initializedRef.current = true;

    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          setUser(
            {
              id: session.user.id,
              name: session.user.user_metadata?.full_name || session.user.email || 'User',
              email: session.user.email || '',
              avatar: session.user.user_metadata?.avatar_url,
            },
            false
          );
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null, false);
      }
    });

    subscriptionRef.current = subscription;

    return () => {
      subscriptionRef.current?.unsubscribe();
      subscriptionRef.current = null;
    };
  }, [initialUser, initialize, setUser]);

  return <>{children}</>;
}
````

## File: lib/auth/actions.ts
````typescript
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ROUTES } from '@/lib/constants/routes';
import { TOAST_MESSAGES } from '@/lib/constants/toast-messages';
import type { SignInData, SignUpData } from '@/types/auth.types';

export async function signIn(data: SignInData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  return { success: true, redirect: ROUTES.TASKS };
}

export async function signUp(data: SignUpData) {
  const supabase = await createClient();

  const { data: signUpData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (signUpData?.user && !signUpData.session) {
    return { 
      success: true,
      message: TOAST_MESSAGES.AUTH.SIGN_UP_EMAIL_CONFIRMATION,
    };
  }

  revalidatePath('/', 'layout');
  return { success: true, redirect: ROUTES.TASKS };
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect(ROUTES.AUTH);
}

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
````

## File: lib/stores/auth-store.ts
````typescript
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: (user: User | null, isLoading?: boolean) => void;
  setLoading: (loading: boolean) => void;
  initialize: (user: User | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,
  initialize: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      isInitialized: true,
    }),
  setUser: (user, isLoading = false) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading,
    }),
  setLoading: (isLoading) => set({ isLoading }),
  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));
````

## File: lib/supabase/middleware.ts
````typescript
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { ROUTES } from '@/lib/constants/routes';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith(ROUTES.AUTH) &&
    request.nextUrl.pathname !== ROUTES.HOME
  ) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.AUTH;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
````

## File: app/layout.tsx
````typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootProvider } from "@/components/providers/root-provider";
import { getServerUser } from "@/lib/auth/server-utils";
import { AppLayout } from "@/components/layout/app-layout";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Task Manager - Organize Your Life',
  description: 'A modern task management application built with Next.js and Supabase',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialUser = await getServerUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootProvider initialUser={initialUser}>
          <AppLayout>{children}</AppLayout>
        </RootProvider>
      </body>
    </html>
  );
}
````

## File: app/tasks/page.tsx
````typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Spinner } from '@/components/ui/spinner';
import { ROUTES } from '@/lib/constants/routes';

export default function TasksPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(ROUTES.AUTH);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <Spinner />
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">My Tasks</h1>
              <p className="text-muted-foreground mt-2">
                Manage your tasks efficiently
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Authentication Successful!</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Welcome, {user?.name}! <br />
                  Your task management dashboard will be built here.
                </p>
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    User ID: <code className="bg-muted px-2 py-1 rounded">{user?.id}</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}
````

## File: components/features/auth/auth-layout.tsx
````typescript
'use client';

import React, { ReactNode } from 'react';
import { CheckCircle2, Zap, Shield, TrendingUp } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
  imageUrl?: string;
}

export function AuthLayout({ children, imageUrl }: AuthLayoutProps) {
  const features = [
    {
      icon: CheckCircle2,
      title: 'Task Management',
      description: 'Organize and track your tasks efficiently',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built for speed and performance',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected',
    },
    {
      icon: TrendingUp,
      title: 'Boost Productivity',
      description: 'Get more done in less time',
    },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex justify-center order-2 lg:order-1">
            {children}
          </div>

          <div className="hidden lg:flex flex-col justify-center space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-primary">
                  Modern Task Management
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Organize your work,
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  achieve more
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join thousands of professionals who trust TaskDesk to streamline their workflow and boost productivity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300 -z-10" />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-xs font-semibold text-primary-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold">
                  10,000+ Users
                </p>
                <p className="text-xs text-muted-foreground">
                  Join our growing community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: components/features/header/header.tsx
````typescript
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/features/theme/theme-toggle';
import { UserMenu } from './user-menu';
import { useAuthStore } from '@/lib/stores/auth-store';
import { LogIn } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import { CONFIG } from '@/lib/constants/config';

export const Header = React.memo(function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > CONFIG.HEADER_SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderAuthButton = useMemo(() => {
    if (isLoading) {
      return (
        <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
      );
    }

    if (isAuthenticated && user) {
      return <UserMenu user={user} />;
    }

    return (
      <Link href={ROUTES.AUTH}>
        <Button variant="outline" size="default" className="gap-2">
          <LogIn className="h-4 w-4" />
          <span>Sign In</span>
        </Button>
      </Link>
    );
  }, [isLoading, isAuthenticated, user]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-primary/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={`relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-all duration-300 ${
                isScrolled
                  ? 'shadow-lg shadow-primary/20'
                  : 'shadow-md'
              } group-hover:scale-110`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 text-primary-foreground"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <span
              className={`text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled ? 'opacity-100' : 'opacity-90'
              }`}
            >
              TaskDesk
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {renderAuthButton}
            <ThemeToggle />
          </div>
        </div>
      </div>

      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      )}
    </header>
  );
});
````

## File: app/auth/page.tsx
````typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/features/auth/auth-layout';
import { AuthContainer } from '@/components/features/auth/auth-container';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Spinner } from '@/components/ui/spinner';
import { ROUTES } from '@/lib/constants/routes';

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated && !isRedirecting) {
      setIsRedirecting(true);
      router.replace(ROUTES.TASKS);
    }
  }, [isAuthenticated, isLoading, isRedirecting, router]);

  if (isLoading || isRedirecting) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner />
          {isRedirecting && (
            <p className="text-sm text-muted-foreground">Redirecting...</p>
          )}
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <AuthLayout imageUrl="/auth.jpg">
        <AuthContainer initialMode="signin" />
      </AuthLayout>
    </div>
  );
}
````

## File: app/page.tsx
````typescript
'use client';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/stores/auth-store';
import { CheckCircle2, Zap, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  return (
    <main className="min-h-screen bg-background pt-16">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-primary">
                  Modern Task Management
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                Organize your work,
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  achieve more
                </span>
              </h1>

              <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
                The most intuitive task management platform for teams and individuals. 
                Stay organized, collaborate effortlessly, and boost your productivity.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {isAuthenticated ? (
                  <Link href={ROUTES.TASKS}>
                    <Button variant="gradient" size="lg" className="gap-2">
                      <span>Go to Dashboard</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href={ROUTES.AUTH}>
                      <Button variant="gradient" size="lg" className="gap-2">
                        <span>Get Started</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg">
                      Watch Demo
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Everything you need to succeed
              </h2>
              <p className="text-lg text-muted-foreground">
                Powerful features to help you manage tasks efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: CheckCircle2,
                  title: 'Task Management',
                  description: 'Create, organize, and track tasks with ease',
                },
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  description: 'Built for speed and performance',
                },
                {
                  icon: Shield,
                  title: 'Secure & Private',
                  description: 'Your data is encrypted and protected',
                },
                {
                  icon: TrendingUp,
                  title: 'Boost Productivity',
                  description: 'Get more done in less time',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 border border-primary/20 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -z-10" />
              
              <div className="text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Ready to get started?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of professionals who trust TaskDesk to manage their work
                </p>
                {isAuthenticated ? (
                  <Link href={ROUTES.TASKS}>
                    <Button variant="gradient" size="lg" className="gap-2">
                      <span>Go to Dashboard</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link href={ROUTES.AUTH}>
                    <Button variant="gradient" size="lg" className="gap-2">
                      <span>Start Free Trial</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-muted-foreground">
              <p>&copy; 2024 TaskDesk. All rights reserved.</p>
            </div>
          </div>
        </footer>
    </main>
  );
}
````

## File: components/features/header/user-menu.tsx
````typescript
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const { signOut } = await import('@/lib/auth/actions');
      const { useAuthStore } = await import('@/lib/stores/auth-store');
      useAuthStore.getState().clearAuth();
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setIsOpen(false);
  };

  const handleProfile = () => {
    router.push(ROUTES.PROFILE);
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          getInitials(user.name)
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-card border border-border rounded-xl shadow-2xl shadow-primary/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-border bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(user.name)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <button
              onClick={handleProfile}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 transition-colors text-sm text-foreground group"
            >
              <User className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span>Profile</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-destructive/10 transition-colors text-sm text-foreground group"
            >
              <LogOut className="h-4 w-4 text-muted-foreground group-hover:text-destructive transition-colors" />
              <span className="group-hover:text-destructive transition-colors">
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
````

## File: components/forms/sign-in-form/index.tsx
````typescript
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { AuthFormField } from '@/components/features/auth/auth-form-field';
import { signInSchema, type SignInFormData } from './form-schema';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github, Chrome } from 'lucide-react';
import { signIn } from '@/lib/auth/actions';
import { ROUTES } from '@/lib/constants/routes';
import { TOAST_MESSAGES } from '@/lib/constants/toast-messages';
import { CONFIG } from '@/lib/constants/config';

interface SignInFormProps {
  onSignUpClick?: () => void;
  onSubmit?: (data: SignInFormData) => void;
}

export function SignInForm({ onSignUpClick, onSubmit }: SignInFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmitForm = async (data: SignInFormData) => {
    setIsLoading(true);
    
    try {
      const result = await signIn(data);
      
      if (result?.error) {
        toast.error(result.error);
        setIsLoading(false);
        return;
      }
      
      if (result?.success) {
        toast.success(TOAST_MESSAGES.AUTH.SIGN_IN_SUCCESS);
        
        const { useAuthStore } = await import('@/lib/stores/auth-store');
        const supabase = await import('@/lib/supabase/client').then(m => m.createClient());
        
        const { data: { user: sessionUser } } = await supabase.auth.getUser();
        
        if (sessionUser) {
          useAuthStore.getState().setUser({
            id: sessionUser.id,
            name: sessionUser.user_metadata?.full_name || sessionUser.email || 'User',
            email: sessionUser.email || '',
            avatar: sessionUser.user_metadata?.avatar_url,
          }, false);
        }
        
        const redirectUrl = result.redirect || ROUTES.TASKS;
        await new Promise(resolve => setTimeout(resolve, 100));
        window.location.href = redirectUrl;
        return;
      }
    } catch (error) {
      toast.error(TOAST_MESSAGES.AUTH.SIGN_IN_ERROR);
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
          <h1 className="text-3xl font-bold tracking-tight">
          Welcome Back
        </h1>
          <p className="text-sm text-muted-foreground">
          Sign in to your account to continue
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
            <button
              type="button"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="gradient"
            size="auth"
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
````

## File: components/forms/sign-up-form/index.tsx
````typescript
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
import { ROUTES } from '@/lib/constants/routes';
import { TOAST_MESSAGES } from '@/lib/constants/toast-messages';
import { CONFIG } from '@/lib/constants/config';

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
          toast.error(TOAST_MESSAGES.AUTH.TERMS_REQUIRED);
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
              toast.success(TOAST_MESSAGES.AUTH.SIGN_UP_SUCCESS);
              
              if (result.redirect) {
                const { useAuthStore } = await import('@/lib/stores/auth-store');
                const supabase = await import('@/lib/supabase/client').then(m => m.createClient());
                
                const { data: { user: sessionUser } } = await supabase.auth.getUser();
                
                if (sessionUser) {
                  useAuthStore.getState().setUser({
                    id: sessionUser.id,
                    name: sessionUser.user_metadata?.full_name || sessionUser.email || 'User',
                    email: sessionUser.email || '',
                    avatar: sessionUser.user_metadata?.avatar_url,
                  }, false);
                }
                
                window.location.href = result.redirect;
              }
            }
            return;
          }
        } catch (error) {
          toast.error(TOAST_MESSAGES.AUTH.SIGN_UP_ERROR);
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
````
