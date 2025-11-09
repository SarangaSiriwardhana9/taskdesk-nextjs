'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Edit2, Save, Eye, CheckCircle2 } from 'lucide-react';
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
import type { Task, TaskModalMode } from '@/types/task.types';
import { TASK_DEFAULTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface TaskModalProps {
  mode: TaskModalMode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TaskFormData) => Promise<void>;
  task?: Task;
  isLoading?: boolean;
  onToggleComplete?: (taskId: string, completed: boolean) => void;
}

export function TaskModal({
  mode,
  open,
  onOpenChange,
  onSubmit,
  task,
  isLoading = false,
  onToggleComplete,
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
      priority: TASK_DEFAULTS.PRIORITY,
      due_date: '',
    },
  });

  const priority = watch('priority');
  const dueDate = watch('due_date');

  useEffect(() => {
    if (open) {
      if ((mode === 'edit' || mode === 'view') && task) {
        reset({
          title: task.title,
          description: task.description || '',
          priority: task.priority,
          due_date: task.due_date ? task.due_date.split('T')[0] : '',
        });
      } else {
        reset({
          title: '',
          description: '',
          priority: TASK_DEFAULTS.PRIORITY,
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
  const isView = mode === 'view';
  const title = isCreate ? 'Create New Task' : isView ? 'Task Details' : 'Edit Task';
  const description = isCreate
    ? 'Add a new task to your list and stay organized.'
    : isView
    ? 'View your task details and information.'
    : 'Update your task details and keep everything current.';
  const submitText = isCreate ? 'Create Task' : 'Update Task';
  const Icon = isCreate ? Plus : isView ? Eye : Edit2;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[85vh] sm:max-h-[95vh] w-[95vw] p-0 overflow-hidden">
        <div className="relative flex flex-col max-h-[85vh] sm:max-h-[95vh]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

          <div className="relative p-4 sm:p-6 pb-0 flex-shrink-0">
            <DialogHeader className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-lg sm:text-xl font-semibold">
                    {title}
                  </DialogTitle>
                  <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {description}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
          </div>

          <Separator className="my-4 sm:my-6 flex-shrink-0" />

          <div className="flex-1 overflow-y-auto px-4 sm:px-6">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="pb-4 sm:pb-6 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Task Title</Label>
                  <Input
                    placeholder="Enter task title..."
                    {...register('title')}
                    readOnly={isView}
                    className={cn(
                      'transition-all duration-200',
                      errors.title && 'border-destructive focus-visible:ring-destructive/20',
                      isView && 'bg-muted/50 cursor-default'
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
                    rows={8}
                    {...register('description')}
                    readOnly={isView}
                    className={cn(
                      'min-h-32 transition-all duration-200',
                      errors.description && 'border-destructive focus-visible:ring-destructive/20',
                      isView && 'bg-muted/50 cursor-default'
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
                  readOnly={isView}
                />

                <DatePicker
                  value={dueDate}
                  onChange={(value) => setValue('due_date', value)}
                  error={errors.due_date?.message}
                  readOnly={isView}
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
                {isView ? 'Close' : 'Cancel'}
              </Button>
              
              {(isView || mode === 'edit') && task && onToggleComplete && (
                <Button
                  type="button"
                  variant={task.completed ? "outline" : "success"}
                  onClick={() => {
                    onToggleComplete(task.id, !task.completed);
                    onOpenChange(false);
                  }}
                  disabled={isLoading}
                  className="gap-2 "
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{task.completed ? 'Mark Incomplete' : 'Mark Complete'}</span>
                </Button>
              )}
              
              {!isView && (
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="gap-2 min-w-[140px]"
                >
                  {isLoading ? (
                    <>
                      <Spinner size="sm" variant="foreground" />
                      <span>{isCreate ? 'Creating...' : 'Updating...'}</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{submitText}</span>
                    </>
                  )}
                </Button>
              )}
            </DialogFooter>
          </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}