'use client';

import React from 'react';
import { CheckCircle2, Clock, ListTodo, Calendar, AlertTriangle, LucideIcon } from 'lucide-react';
import { isToday, isPast } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import type { Task } from '@/types/task.types';

interface StatCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  label: string;
  value: number;
  subtitle?: string;
  valueColor?: string;
}

function StatCard({ icon: Icon, iconColor, iconBgColor, label, value, subtitle, valueColor }: StatCardProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border/50 py-0 gap-0">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1 sm:space-y-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm font-medium">{label}</span>
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <p className={`text-2xl sm:text-3xl font-bold ${valueColor || ''}`}>{value}</p>
              {subtitle && (
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {subtitle}
                </span>
              )}
            </div>
          </div>
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${iconBgColor} flex items-center justify-center`}>
            <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
    
    const overdueTasks = tasks.filter((t) => {
      if (!t.due_date || t.completed) return false;
      const dueDate = new Date(t.due_date);
      return isPast(dueDate) && !isToday(dueDate);
    }).length;
    
    return { total, completed, pending, completionRate, todayTasks, overdueTasks };
  }, [tasks]);

  const statCards: StatCardProps[] = [
    {
      icon: ListTodo,
      iconColor: 'text-primary',
      iconBgColor: 'bg-primary/10',
      label: 'Total Tasks',
      value: stats.total,
    },
    {
      icon: Clock,
      iconColor: 'text-amber-500',
      iconBgColor: 'bg-amber-500/10',
      label: 'Pending',
      value: stats.pending,
    },
    {
      icon: CheckCircle2,
      iconColor: 'text-green-500',
      iconBgColor: 'bg-green-500/10',
      label: 'Completed',
      value: stats.completed,
      subtitle: stats.total > 0 ? `(${stats.completionRate}%)` : undefined,
    },
    {
      icon: Calendar,
      iconColor: 'text-blue-500',
      iconBgColor: 'bg-blue-500/10',
      label: 'Today',
      value: stats.todayTasks,
    },
    {
      icon: AlertTriangle,
      iconColor: 'text-red-500',
      iconBgColor: 'bg-red-500/10',
      label: 'Overdue',
      value: stats.overdueTasks,
      valueColor: 'text-red-600 dark:text-red-400',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          My Tasks
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
          Organize your work and stay productive
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {statCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
