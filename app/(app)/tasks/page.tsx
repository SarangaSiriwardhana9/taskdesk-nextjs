'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CheckCircle2 } from 'lucide-react';
import { useAuthUser } from '@/lib/stores/auth-store';
import { CreateTaskFab } from '@/components/features/tasks/create-task-fab';
import { createTask } from '@/lib/tasks/actions';
import { TOAST_MESSAGES } from '@/lib/constants/toast-messages';
import type { TaskFormData } from '@/components/forms/task-form/form-schema';

export default function TasksPage() {
  const user = useAuthUser();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTask = async (data: TaskFormData) => {
    setIsCreating(true);

    try {
      const result = await createTask({
        title: data.title,
        description: data.description,
        priority: data.priority,
        due_date: data.due_date,
      });

      if (result?.error) {
        toast.error(result.error || TOAST_MESSAGES.TASKS.CREATE_ERROR);
        return;
      }

      if (result?.success) {
        toast.success(TOAST_MESSAGES.TASKS.CREATE_SUCCESS);
        router.refresh();
      }
    } catch (error) {
      toast.error(TOAST_MESSAGES.TASKS.CREATE_ERROR);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">My Tasks</h1>
            <p className="text-muted-foreground mt-2">Manage your tasks efficiently</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Welcome, {user?.name}!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Create your first task using the button below or the floating action button.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CreateTaskFab onCreateTask={handleCreateTask} isLoading={isCreating} />
    </main>
  );
}