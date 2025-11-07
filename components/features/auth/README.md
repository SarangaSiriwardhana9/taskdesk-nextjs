# Authentication UI Components

A modern, beautiful, and fully responsive authentication system for TaskDesk.

## 🎨 Design Features

- **Modern Glass-morphism Design**: Cards with backdrop blur and gradient effects
- **Animated Background**: Pulsing gradient orbs for visual appeal
- **Smooth Transitions**: Seamless switching between sign-in and sign-up modes
- **Social Login Options**: Pre-built buttons for Google and GitHub
- **Password Strength Indicator**: Real-time password validation feedback
- **Loading States**: Beautiful loading animations for better UX
- **Dark Mode Support**: Fully compatible with light and dark themes
- **Responsive Design**: Mobile-first approach that looks great on all devices
- **Trust Badges**: Security indicators to build user confidence
- **Feature Showcase**: Highlight key product features on the auth page

## 📦 Components

### 1. AuthLayout

The main container for the authentication page with animated background and brand header.

```tsx
import { AuthLayout } from '@/components/features/auth';

<AuthLayout imageUrl="/auth.jpg">
  {children}
</AuthLayout>
```

**Features:**
- Animated gradient background orbs
- Brand logo and name in header
- Theme toggle button
- Feature grid showcase
- Social proof section
- Responsive layout

### 2. AuthContainer

Manages the state between sign-in and sign-up forms with smooth transitions.

```tsx
import { AuthContainer } from '@/components/features/auth';

<AuthContainer initialMode="signin" />
```

**Props:**
- `initialMode`: 'signin' | 'signup' (default: 'signin')

### 3. AuthFormField

A reusable form field wrapper with icon support and error handling.

```tsx
import { AuthFormField } from '@/components/features/auth';
import { Mail } from 'lucide-react';

<AuthFormField
  label="Email Address"
  icon={<Mail className="h-4 w-4" />}
  error={errors.email?.message}
>
  <Input {...register('email')} />
</AuthFormField>
```

**Props:**
- `label`: Field label text
- `icon`: Optional icon component
- `error`: Error message string
- `action`: Optional action button (e.g., password toggle)
- `children`: Form input component

### 4. PasswordStrength (New)

Visual indicator for password strength with requirement checklist.

```tsx
import { PasswordStrength } from '@/components/features/auth';

const [password, setPassword] = useState('');

<PasswordStrength password={password} />
```

**Features:**
- Color-coded strength bar (red → yellow → blue → green)
- Real-time requirement validation
- Checks for:
  - Minimum 8 characters
  - Uppercase letters
  - Lowercase letters
  - Numbers

### 5. SocialLoginButton (New)

Reusable button component for social authentication.

```tsx
import { SocialLoginButton } from '@/components/features/auth';
import { Chrome } from 'lucide-react';

<SocialLoginButton
  provider="google"
  icon={Chrome}
  onClick={() => handleSocialLogin('google')}
/>
```

**Supported Providers:**
- Google
- GitHub
- Apple
- Microsoft

## 🎯 Usage Example

### Basic Setup (Already Implemented)

```tsx
// app/auth/page.tsx
import { AuthLayout, AuthContainer } from '@/components/features/auth';

export default function AuthPage() {
  return (
    <AuthLayout imageUrl="/auth.jpg">
      <AuthContainer initialMode="signin" />
    </AuthLayout>
  );
}
```

### With Password Strength Indicator

You can easily add the password strength indicator to the sign-up form:

```tsx
import { PasswordStrength } from '@/components/features/auth';

// In your form component
const [password, setPassword] = useState('');

<AuthFormField label="Password" /* ... */>
  <Input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</AuthFormField>
<PasswordStrength password={password} />
```

## 🎨 Customization

### Colors

The design uses your existing theme variables. To customize colors, update your `globals.css`:

```css
:root {
  --primary: oklch(0.55 0.2 280);    /* Main brand color */
  --accent: oklch(0.55 0.2 280);     /* Accent color */
  --border: oklch(0.9 0.005 280);    /* Border color */
  /* ... */
}
```

### Animations

Custom animations are defined in `globals.css`:

- `animate-gradient`: Animated gradient text
- `animate-pulse`: Pulsing background orbs
- `animate-spin`: Loading spinner

### Features Showcase

Update the features array in `auth-layout.tsx`:

```tsx
const features = [
  {
    icon: CheckCircle2,
    title: 'Your Feature',
    description: 'Feature description',
  },
  // Add more features...
];
```

## 🔒 Security Features

1. **Client-side Validation**: Zod schemas for form validation
2. **Password Visibility Toggle**: Secure password entry
3. **Trust Badges**: Visual security indicators
4. **Terms & Conditions**: Checkbox for sign-up compliance
5. **Loading States**: Prevents multiple submissions

## 📱 Responsive Design

- **Mobile (< 768px)**: Single column layout, forms only
- **Tablet (768px - 1024px)**: Two column layout
- **Desktop (> 1024px)**: Full feature showcase with forms

## ⚡ Performance

- **Lazy Loading**: Components load on-demand
- **Optimized Animations**: GPU-accelerated transforms
- **Minimal Re-renders**: Optimized state management
- **Small Bundle**: Uses existing shadcn/ui components

## 🚀 Future Enhancements

Consider adding:
1. Email verification flow
2. Password reset functionality
3. Multi-factor authentication (MFA)
4. Remember me functionality
5. OAuth integration for social logins
6. Biometric authentication support
7. Session management

## 📝 Best Practices

1. **Always validate on backend**: Client-side validation is for UX only
2. **Use HTTPS**: Never send credentials over HTTP
3. **Implement rate limiting**: Prevent brute force attacks
4. **Store passwords securely**: Use bcrypt or similar
5. **Add CSRF protection**: Protect against cross-site attacks
6. **Implement proper session management**: Secure cookies, JWT, etc.

## 🎓 Learning Resources

- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [shadcn/ui](https://ui.shadcn.com/)

---

Built with ❤️ for TaskDesk

