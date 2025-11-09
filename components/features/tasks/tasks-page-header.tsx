'use client';

import React from 'react';
import { CheckCircle2, Clock, ListTodo, Calendar, CalendarDays, AlertTriangle } from 'lucide-react';
import { isToday, startOfWeek, endOfWeek, isPast } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import type { Task } from '@/types/task.types';

interface TasksPageHeaderProps {
  tasks: Task[];
}

export function TasksPageHeader({ tasks }: TasksPageHeaderProps) {
  const stats = React.useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const todayTasks = tasks.filter((t) => {
      if (!t.due_date) return false;
      const dueDate = new Date(t.due_date);
      return isToday(dueDate);
    }).length;
    
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
    const thisWeekTasks = tasks.filter((t) => {
      if (!t.due_date) return false;
      const dueDate = new Date(t.due_date);
      return dueDate >= weekStart && dueDate <= weekEnd;
    }).length;
    
    const overdueTasks = tasks.filter((t) => {
      if (!t.due_date || t.completed) return false;
      const dueDate = new Date(t.due_date);
      return isPast(dueDate) && !isToday(dueDate);
    }).length;
    
    return { total, completed, pending, completionRate, todayTasks, thisWeekTasks, overdueTasks };
  }, [tasks]);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
          My Tasks
        </h1>
        <p className="text-muted-foreground text-base lg:text-lg">
          Organize your work and stay productive
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="bg-card/50 backdrop-blur-xl border-border/50 py-0 gap-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ListTodo className="h-4 w-4" />
                  <span className="text-sm font-medium">Total Tasks</span>
                </div>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ListTodo className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50 py-0 gap-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Pending</span>
                </div>
                <p className="text-3xl font-bold">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50 py-0 gap-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold">{stats.completed}</p>
                  {stats.total > 0 && (
                    <span className="text-sm text-muted-foreground">
                      ({stats.completionRate}%)
                    </span>
                  )}
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50 py-0 gap-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Today</span>
                </div>
                <p className="text-3xl font-bold">{stats.todayTasks}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50 py-0 gap-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Overdue</span>
                </div>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.overdueTasks}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
