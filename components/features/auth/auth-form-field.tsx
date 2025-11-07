 
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