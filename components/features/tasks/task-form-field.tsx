'use client';

import React, { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface TaskFormFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function TaskFormField({
  label,
  required = false,
  optional = false,
  error,
  children,
  className,
}: TaskFormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
        {optional && (
          <span className="text-muted-foreground font-normal ml-1">(Optional)</span>
        )}
      </Label>
      {children}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

