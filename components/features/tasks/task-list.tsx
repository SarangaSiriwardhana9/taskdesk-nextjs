'use client';

import React, { useState, useMemo } from 'react';
import { Filter, CheckCircle2, Clock, AlertCircle, ArrowUpDown } from 'lucide-react';
import { CONFIG } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskCard } from './task-card';
import { EmptyTasks } from './empty-tasks';
import type { Task, TaskPriority } from '@/types/task.types';

type FilterType = 'all' | 'pending' | 'completed';
type SortType = 'date' | 'priority' | 'due_date';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string, completed: boolean) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onView: (task: Task) => void;
}

export function TaskList({ tasks, onToggleComplete, onDelete, onEdit, onView }: TaskListProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('date');

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    if (filter === 'pending') {
      filtered = tasks.filter((task) => !task.completed);
    } else if (filter === 'completed') {
      filtered = tasks.filter((task) => task.completed);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder: Record<TaskPriority, number> = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }

      if (sortBy === 'due_date') {
        if (!a.due_date && !b.due_date) return 0;
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      }

      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return sorted;
  }, [tasks, filter, sortBy]);

  if (tasks.length === 0) {
    return <EmptyTasks />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter:</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="min-w-[60px]"
            >
              All
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('pending')}
              className="gap-2 min-w-[90px]"
            >
              <Clock className="h-3.5 w-3.5" />
              Pending
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
              className="gap-2 min-w-[110px]"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Completed
            </Button>
          </div>
        </div>

        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortType)}>
          <SelectTrigger size="sm" className="w-[160px]">
            <ArrowUpDown className="h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Created Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="due_date">Due Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredAndSortedTasks.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
          <p className="text-muted-foreground">
            {filter === 'pending'
              ? "You don't have any pending tasks. Great job!"
              : filter === 'completed'
              ? "You haven't completed any tasks yet."
              : 'No tasks match your filters.'}
          </p>
        </div>
      ) : (
        <div className={CONFIG.TASK_GRID_LAYOUT}>
          {filteredAndSortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}
              onView={onView}
            />
          ))}
        </div>
      )}
    </div>
  );
}