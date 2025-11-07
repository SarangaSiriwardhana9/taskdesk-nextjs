'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import { PrioritySelector } from './priority-selector';
import { DatePicker } from './date-picker';
import { taskSchema, type TaskFormData } from '@/components/forms/task-form/form-schema';
import { cn } from '@/lib/utils';
import type { TaskPriority } from '@/types/task.types';

interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TaskFormData) => Promise<void>;
  isLoading?: boolean;
}

export function CreateTaskModal({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: CreateTaskModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'Medium',
      due_date: undefined,
    },
  });

  const priority = watch('priority');
  const titleValue = watch('title');
  const descriptionValue = watch('description');

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        const titleInput = document.querySelector<HTMLInputElement>('input[name="title"]');
        titleInput?.focus();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  const onFormSubmit = async (data: TaskFormData) => {
    await onSubmit(data);
    if (!isLoading) {
      reset();
      onOpenChange(false);
    }
  };

  const titleCharCount = titleValue?.length || 0;
  const descriptionCharCount = descriptionValue?.length || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!max-w-5xl w-[95vw] max-h-[90vh] overflow-hidden p-0 gap-0 border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl shadow-primary/5"
        showCloseButton={false}
      >
        <div className="relative p-8 space-y-6 overflow-y-auto max-h-[90vh]">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <DialogHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 blur-xl" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                    <Plus className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold tracking-tight">
                    Create New Task
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Organize your work and stay productive
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-9 w-9"
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Task Title <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="title"
                      placeholder="Enter task title..."
                      variant="auth"
                      inputSize="auth"
                      className="pr-16"
                      {...register('title')}
                      disabled={isLoading}
                      maxLength={200}
                      aria-invalid={errors.title ? 'true' : 'false'}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <span
                        className={cn(
                          'text-xs text-muted-foreground',
                          titleCharCount > 180 && 'text-yellow-600 dark:text-yellow-400',
                          titleCharCount >= 200 && 'text-destructive'
                        )}
                      >
                        {titleCharCount}/200
                      </span>
                    </div>
                  </div>
                  {errors.title && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Description <span className="text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Textarea
                      id="description"
                      placeholder="Add more details about this task..."
                      className="min-h-32 pr-16 resize-none"
                      {...register('description')}
                      disabled={isLoading}
                      maxLength={1000}
                      aria-invalid={errors.description ? 'true' : 'false'}
                    />
                    <div className="absolute bottom-3 right-3">
                      <span
                        className={cn(
                          'text-xs text-muted-foreground',
                          descriptionCharCount > 900 && 'text-yellow-600 dark:text-yellow-400',
                          descriptionCharCount >= 1000 && 'text-destructive'
                        )}
                      >
                        {descriptionCharCount}/1000
                      </span>
                    </div>
                  </div>
                  {errors.description && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <PrioritySelector
                  value={priority}
                  onChange={(newPriority) => setValue('priority', newPriority, { shouldValidate: true })}
                  error={errors.priority?.message}
                />

                <DatePicker
                  value={watch('due_date')}
                  onChange={(date) => setValue('due_date', date, { shouldValidate: true })}
                  error={errors.due_date?.message}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
    
                size="lg"
                disabled={isLoading}
                className="gap-2 min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" variant="foreground" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Create Task</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

