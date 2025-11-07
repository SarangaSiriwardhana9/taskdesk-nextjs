'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CreateTaskModal } from './create-task-modal';
import type { TaskFormData } from '@/components/forms/task-form/form-schema';

interface CreateTaskFabProps {
  onCreateTask: (data: TaskFormData) => Promise<void>;
  isLoading?: boolean;
}

export function CreateTaskFab({ onCreateTask, isLoading = false }: CreateTaskFabProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (!isLoading) {
      setIsOpen(open);
    }
  };

  const handleSubmit = async (data: TaskFormData) => {
    await onCreateTask(data);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          type="button"
          size="lg"
          onClick={() => setIsOpen(true)}
          disabled={isLoading}
          className={cn(
            'group relative h-14 w-14 rounded-full shadow-2xl shadow-primary/30',
            'hover:scale-110 hover:shadow-primary/40 active:scale-105',
            'transition-all duration-300 ease-out',
            'focus-visible:scale-110 focus-visible:ring-4 focus-visible:ring-primary/30'
          )}
          aria-label="Create new task"
        >
          <Plus className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10" />
        </Button>
      </div>

      <CreateTaskModal
        open={isOpen}
        onOpenChange={handleOpenChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
}

