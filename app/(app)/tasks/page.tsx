'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthUser } from '@/lib/stores/auth-store';
import { CreateTaskFab } from '@/components/features/tasks/create-task-fab';
import { TasksPageHeader } from '@/components/features/tasks/tasks-page-header';
import { TaskList } from '@/components/features/tasks/task-list';
import { EmptyTasks } from '@/components/features/tasks/empty-tasks';
import { TaskModal } from '@/components/features/tasks/task-modal';
import { createTask, updateTask, deleteTask, getTasks } from '@/lib/tasks/actions';
import { TOAST_MESSAGES } from '@/lib/constants/toast-messages';
import { CONFIG } from '@/lib/constants/config';
import { Skeleton } from '@/components/ui/skeleton';
import type { TaskFormData } from '@/components/forms/task-form/form-schema';
import type { Task } from '@/types/task.types';

export default function TasksPage() {
  const user = useAuthUser();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    const result = await getTasks();
    if (result.error) {
      toast.error(result.error);
    } else {
      setTasks(result.tasks);
    }
    setIsLoading(false);
  };

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
        await loadTasks();
        setShowCreateModal(false);
      }
    } catch (error) {
      toast.error(TOAST_MESSAGES.TASKS.CREATE_ERROR);
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    const previousTasks = tasks;
    
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      )
    );

    try {
      const result = await updateTask(taskId, { completed });
      if (result?.error) {
        setTasks(previousTasks);
        toast.error(result.error || TOAST_MESSAGES.TASKS.UPDATE_ERROR);
      } else {
        toast.success(completed ? TOAST_MESSAGES.TASKS.COMPLETE_SUCCESS : TOAST_MESSAGES.TASKS.INCOMPLETE_SUCCESS);
      }
    } catch (error) {
      setTasks(previousTasks);
      toast.error(TOAST_MESSAGES.TASKS.UPDATE_ERROR);
    }
  };

  const handleDelete = async (taskId: string) => {
    const previousTasks = tasks;
    
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    try {
      const result = await deleteTask(taskId);
      if (result?.error) {
        setTasks(previousTasks);
        toast.error(result.error || TOAST_MESSAGES.TASKS.DELETE_ERROR);
      } else {
        toast.success(TOAST_MESSAGES.TASKS.DELETE_SUCCESS);
      }
    } catch (error) {
      setTasks(previousTasks);
      toast.error(TOAST_MESSAGES.TASKS.DELETE_ERROR);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleEditTask = async (data: TaskFormData) => {
    if (!editingTask) return;
    
    setIsEditing(true);
    const previousTasks = tasks;
    
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, ...data, updated_at: new Date().toISOString() }
          : task
      )
    );

    try {
      const result = await updateTask(editingTask.id, data);
      if (result?.error) {
        setTasks(previousTasks);
        toast.error(result.error || TOAST_MESSAGES.TASKS.UPDATE_ERROR);
      } else {
        toast.success(TOAST_MESSAGES.TASKS.UPDATE_SUCCESS);
        setEditingTask(null);
      }
    } catch (error) {
      setTasks(previousTasks);
      toast.error(TOAST_MESSAGES.TASKS.UPDATE_ERROR);
    } finally {
      setIsEditing(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-12 w-48 rounded-xl" />
              <Skeleton className="h-6 w-96" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array.from({ length: CONFIG.SKELETON_COUNTS.HEADER }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-2xl" />
              ))}
            </div>
            <div className={CONFIG.TASK_GRID_LAYOUT}>
              {Array.from({ length: CONFIG.SKELETON_COUNTS.TASKS }).map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          <TasksPageHeader tasks={tasks} />

          {tasks.length === 0 ? (
            <EmptyTasks />
          ) : (
            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </div>
      </div>

      <CreateTaskFab onCreateTask={() => setShowCreateModal(true)} isLoading={false} />
      
      <TaskModal
        mode="create"
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSubmit={handleCreateTask}
        isLoading={isCreating}
      />
      
      <TaskModal
        mode="edit"
        open={!!editingTask}
        onOpenChange={(open) => {
          if (!open) {
            setEditingTask(null);
          }
        }}
        onSubmit={handleEditTask}
        task={editingTask || undefined}
        isLoading={isEditing}
      />
    </main>
  );
}
