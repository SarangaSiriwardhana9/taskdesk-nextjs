'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  value?: string;
  onChange: (date: string | undefined) => void;
  error?: string;
}

const quickOptions = [
  { 
    label: 'Today', 
    getDate: () => {
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return today;
    }
  },
  { 
    label: 'Tomorrow', 
    getDate: () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(23, 59, 59, 999);
      return tomorrow;
    }
  },
  { 
    label: 'Next Week', 
    getDate: () => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      nextWeek.setHours(23, 59, 59, 999);
      return nextWeek;
    }
  },
];

export function DatePicker({ value, onChange, error }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  
  const date = value ? new Date(value) : undefined;

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      onChange(dateString);
    } else {
      onChange(undefined);
    }
    setOpen(false);
  };

  const handleQuickOption = (getDate: () => Date) => {
    const date = getDate();
    handleSelect(date);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Due Date <span className="text-muted-foreground font-normal">(Optional)</span>
      </label>
      
      <div className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <Clock className="h-3 w-3" />
            Quick Options
          </div>
          <div className="grid grid-cols-3 gap-2">
            {quickOptions.map((option) => (
              <Button
                key={option.label}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickOption(option.getDate)}
                className="h-auto flex-col gap-1 py-2.5 dark:hover:text-foreground [&_svg]:dark:hover:text-foreground"
              >
                <CalendarIcon className="h-4 w-4" />
                <span className="text-xs">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <CalendarIcon className="h-3 w-3" />
            Custom Date
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    'h-11 w-full justify-start text-left font-normal bg-background/50 pr-10',
                    !date && 'text-muted-foreground',
                    error && 'border-destructive ring-destructive/20'
                  )}
                >
                  <CalendarIcon className="mr-3 h-4 w-4 shrink-0" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
                {date && (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={handleClear}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleClear(e as unknown as React.MouseEvent);
                      }
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-muted transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label="Clear date"
                  >
                    <X className="h-3 w-3 text-muted-foreground" />
                  </div>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelect}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
