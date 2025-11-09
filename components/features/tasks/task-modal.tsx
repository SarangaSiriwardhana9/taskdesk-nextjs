'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Edit2, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { PrioritySelector } from './priority-selector';
import { DatePicker } from './date-picker';
import { taskSchema, type TaskFormData } from '@/components/forms/task-form/form-schema';
import type { Task } from '@/types/task.types';
import { cn } from '@/lib/utils';

interface TaskModalProps {
  mode: 'create' | 'edit';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TaskFormData) => Promise<void>;
  task?: Task;
  isLoading?: boolean;
}

export function TaskModal({
  mode,
  open,
  onOpenChange,
  onSubmit,
  task,
  isLoading = false,
}: TaskModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'Medium',
      due_date: '',
    },
  });

  const priority = watch('priority');
  const dueDate = watch('due_date');

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && task) {
        reset({
          title: task.title,
          description: task.description || '',
          priority: task.priority,
          due_date: task.due_date || '',
        });
      } else {
        reset({
          title: '',
          description: '',
          priority: 'Medium',
          due_date: '',
        });
      }
    }
  }, [open, mode, task, reset]);

  const handleFormSubmit = async (data: TaskFormData) => {
    await onSubmit(data);
    if (!isLoading) {
      onOpenChange(false);
    }
  };

  const isCreate = mode === 'create';
  const title = isCreate ? 'Create New Task' : 'Edit Task';
  const description = isCreate
    ? 'Add a new task to your list and stay organized.'
    : 'Update your task details and keep everything current.';
  const submitText = isCreate ? 'Create Task' : 'Update Task';
  const Icon = isCreate ? Plus : Edit2;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

          <div className="relative p-6 pb-0">
            <DialogHeader className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-semibold">
                    {title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground mt-1">
                    {description}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
          </div>

          <Separator className="my-6" />

          <form onSubmit={handleSubmit(handleFormSubmit)} className="px-6 pb-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Task Title</Label>
                  <Input
                    placeholder="Enter task title..."
                    {...register('title')}
                    className={cn(
                      'transition-all duration-200',
                      errors.title && 'border-destructive focus-visible:ring-destructive/20'
                    )}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Add task description (optional)..."
                    rows={6}
                    {...register('description')}
                    className={cn(
                      'resize-none transition-all duration-200',
                      errors.description && 'border-destructive focus-visible:ring-destructive/20'
                    )}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <PrioritySelector
                  value={priority}
                  onChange={(value) => setValue('priority', value)}
                  error={errors.priority?.message}
                />

                <DatePicker
                  value={dueDate}
                  onChange={(value) => setValue('due_date', value)}
                  error={errors.due_date?.message}
                />
              </div>
            </div>

            <DialogFooter className="gap-3 pt-4">
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
                disabled={isLoading}
                className="gap-2 min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" variant="foreground" />
                    <span>{isCreate ? 'Creating...' : 'Updating...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>{submitText}</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}