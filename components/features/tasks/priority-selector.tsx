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
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-600 dark:text-blue-400',
      icon: 'text-blue-600 dark:text-blue-400',
      hoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-950/50',
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
  readOnly?: boolean;
}

export function PrioritySelector({ value, onChange, error, readOnly }: PrioritySelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Priority</Label>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {priorities.map((priority) => {
          const Icon = priority.icon;
          const isSelected = value === priority.value;

          return (
            <button
              key={priority.value}
              type="button"
              onClick={() => !readOnly && onChange(priority.value)}
              disabled={readOnly}
              className={cn(
                'relative h-auto flex flex-col items-center justify-center gap-1 sm:gap-2 p-3 sm:p-4 rounded-md border-2 outline-none min-h-[80px] sm:min-h-[90px]',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                priority.colorClasses.bg,
                isSelected ? 'border-primary ring-2 ring-primary/20 ring-offset-2 dark:ring-offset-background' : priority.colorClasses.border,
                priority.colorClasses.text,
                !readOnly && priority.colorClasses.hoverBg,
                'active:bg-inherit',
                error && !isSelected && 'border-destructive/50',
                readOnly && 'cursor-default opacity-75'
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