'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Flag, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import type { TaskPriority } from '@/types/task.types';

interface PriorityOption {
  value: TaskPriority;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  hoverBgColor: string;
}

const priorities: PriorityOption[] = [
  {
    value: 'Low',
    label: 'Low',
    icon: TrendingDown,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-green-200 dark:border-green-800',
    hoverBgColor: 'hover:bg-green-100 dark:hover:bg-green-950/50',
  },
  {
    value: 'Medium',
    label: 'Medium',
    icon: Minus,
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    hoverBgColor: 'hover:bg-yellow-100 dark:hover:bg-yellow-950/50',
  },
  {
    value: 'High',
    label: 'High',
    icon: TrendingUp,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    borderColor: 'border-red-200 dark:border-red-800',
    hoverBgColor: 'hover:bg-red-100 dark:hover:bg-red-950/50',
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
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Priority
      </label>
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
                'group relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all duration-200',
                priority.bgColor,
                priority.borderColor,
                priority.hoverBgColor,
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 ring-offset-2 dark:ring-offset-background shadow-md scale-105'
                  : 'hover:scale-105 hover:shadow-md',
                error && !isSelected && 'border-destructive/50'
              )}
            >
              <div
                className={cn(
                  'rounded-lg p-2 transition-all duration-200',
                  isSelected ? 'bg-primary/10' : priority.bgColor
                )}
              >
                <Icon
                  className={cn(
                    'h-5 w-5 transition-colors duration-200',
                    isSelected ? 'text-primary' : priority.color
                  )}
                />
              </div>
              <span
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  isSelected ? 'text-primary' : priority.color
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

