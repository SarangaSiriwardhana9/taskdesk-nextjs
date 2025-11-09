'use client';

import React from 'react';
import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';
import { Calendar, CheckCircle2, Circle, Flag, MoreVertical, Trash2, Edit2, Clock, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Task, TaskPriority } from '@/types/task.types';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: string, completed: boolean) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onView: (task: Task) => void;
}

const priorityConfig: Record<TaskPriority, { variant: 'low' | 'medium' | 'high'; icon: string; border: string }> = {
  Low: {
    variant: 'low',
    icon: 'bg-yellow-500',
    border: 'border-yellow-400 dark:border-yellow-500',
  },
  Medium: {
    variant: 'medium',
    icon: 'bg-blue-500',
    border: 'border-blue-400 dark:border-blue-500',
  },
  High: {
    variant: 'high',
    icon: 'bg-red-500',
    border: 'border-red-500 dark:border-red-400',
  },
};

export function TaskCard({ task, onToggleComplete, onDelete, onEdit, onView }: TaskCardProps) {
  const priority = priorityConfig[task.priority];
  const dueDate = task.due_date ? new Date(task.due_date) : null;

  const getDueDateLabel = () => {
    if (!dueDate) return null;
    if (isToday(dueDate)) return 'Today';
    if (isTomorrow(dueDate)) return 'Tomorrow';
    if (isPast(dueDate) && !isToday(dueDate)) return 'Overdue';
    return formatDistanceToNow(dueDate, { addSuffix: true });
  };

  const isOverdue = dueDate && isPast(dueDate) && !isToday(dueDate) && !task.completed;

  const handleToggleComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    onToggleComplete(task.id, !task.completed);
    e.currentTarget.blur();
  };

  return (
    <div
      className={cn(
        'relative rounded-xl border-2 bg-card p-6',
        task.completed
          ? 'border-green-500 dark:border-green-400'
          : priority.border
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-2 mt-1">
          <button
            onClick={handleToggleComplete}
            className={cn(
              'flex-shrink-0 rounded-full border-2 p-0.5 transition-all duration-75',
              'outline-none focus-visible:ring-2 focus-visible:ring-offset-1 active:scale-95',
              task.completed
                ? 'border-green-500 dark:border-green-400 bg-green-500 dark:bg-green-400 focus-visible:ring-green-500'
                : 'border-muted-foreground/30 hover:border-muted-foreground focus-visible:ring-primary'
            )}
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed ? (
              <CheckCircle2 className="h-5 w-5 text-white transition-transform duration-75" />
            ) : (
              <Circle className="h-5 w-5 text-transparent" />
            )}
          </button>
          
          <button
            onClick={() => onView(task)}
            className={cn(
              'flex-shrink-0 rounded-full border-2 p-0.5 transition-all duration-75',
              'outline-none focus-visible:ring-2 focus-visible:ring-offset-1 active:scale-95',
              'border-muted-foreground/30 hover:border-primary hover:bg-primary/10 focus-visible:ring-primary'
            )}
            aria-label="View task details"
          >
            <Eye className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </button>
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  'text-lg font-semibold leading-tight',
                  task.completed
                    ? 'text-muted-foreground'
                    : 'text-foreground'
                )}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="mt-1.5 text-sm leading-relaxed line-clamp-2 text-muted-foreground">
                  {task.description}
                </p>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onDelete(task.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={priority.variant}>
              <div className={cn('h-2 w-2 rounded-full', priority.icon)} />
              {task.priority}
            </Badge>

            {dueDate && (
              <Badge variant={isOverdue ? 'overdue' : 'due'}>
                <Clock className="h-3 w-3" />
                <span>{getDueDateLabel()}</span>
              </Badge>
            )}

            {dueDate && (
              <div className="text-xs text-muted-foreground">
                <Calendar className="inline h-3 w-3 mr-1" />
                {format(dueDate, 'MMM d, yyyy')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}