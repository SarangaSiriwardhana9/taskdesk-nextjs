'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Flag, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import type { TaskPriority } from '@/types/task.types';

interface PriorityOption {
  value: TaskPriority;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClasses: {
    bg: string;
    border: string;
    text: string;
    icon: string;
    hoverBg: string;
  };
}

const priorities: PriorityOption[] = [
  {
    value: 'Low',
    label: 'Low',
    icon: TrendingDown,
    colorClasses: {
      bg: 'bg-yellow-50 dark:bg-yellow-950/30',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-600 dark:text-yellow-400',
      icon: 'text-yellow-600 dark:text-yellow-400',
      hoverBg: 'hover:bg-yellow-100 dark:hover:bg-yellow-950/50',
    },
  },
  {
    value: 'Medium',
    label: 'Medium',
    icon: Minus,
    colorClasses: {
      bg: 'bg-orange-50 dark:bg-orange-950/30',
      border: 'border-orange-200 dark:border-orange-800',
      text: 'text-orange-600 dark:text-orange-400',
      icon: 'text-orange-600 dark:text-orange-400',
      hoverBg: 'hover:bg-orange-100 dark:hover:bg-orange-950/50',
    },
  },
  {
    value: 'High',
    label: 'High',
    icon: TrendingUp,
    colorClasses: {
      bg: 'bg-red-50 dark:bg-red-950/30',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-600 dark:text-red-400',
      icon: 'text-red-600 dark:text-red-400',
      hoverBg: 'hover:bg-red-100 dark:hover:bg-red-950/50',
    },
  },
];

interface PrioritySelectorProps {
  value: TaskPriority;
  onChange: (priority: TaskPriority) => void;
  error?: string;
}

export function PrioritySelector({ value, onChange, error }: PrioritySelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Priority</Label>
      <div className="grid grid-cols-3 gap-3">
        {priorities.map((priority) => {
          const Icon = priority.icon;
          const isSelected = value === priority.value;

          return (
            <button
              key={priority.value}
              type="button"
              onClick={() => onChange(priority.value)}
              className={cn(
                'relative h-auto flex flex-col items-center justify-center gap-2 p-4 rounded-md border-2 outline-none',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                priority.colorClasses.bg,
                isSelected ? 'border-primary ring-2 ring-primary/20 ring-offset-2 dark:ring-offset-background' : priority.colorClasses.border,
                priority.colorClasses.text,
                priority.colorClasses.hoverBg,
                'active:bg-inherit',
                error && !isSelected && 'border-destructive/50'
              )}
            >
              <div
                className={cn(
                  'rounded-lg p-2',
                  priority.colorClasses.bg
                )}
              >
                <Icon
                  className={cn(
                    'h-5 w-5',
                    priority.colorClasses.icon
                  )}
                />
              </div>
              <span
                className={cn(
                  'text-sm font-medium',
                  priority.colorClasses.text
                )}
              >
                {priority.label}
              </span>
              {isSelected && (
                <div className="absolute -top-1 -right-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Flag className="h-3 w-3 text-primary-foreground" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}