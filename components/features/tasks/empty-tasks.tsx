'use client';

import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyTasksProps {
  onCreateTask?: () => void;
}

export function EmptyTasks({ onCreateTask }: EmptyTasksProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-12 text-center">
      <div className="space-y-4">
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">No tasks yet</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Get started by creating your first task. Organize your work and stay productive!
          </p>
          {onCreateTask && (
            <Button onClick={onCreateTask} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Create Your First Task
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

