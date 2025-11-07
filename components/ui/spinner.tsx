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

