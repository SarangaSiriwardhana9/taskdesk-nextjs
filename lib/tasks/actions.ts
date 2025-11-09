'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { ROUTES } from '@/lib/constants';
import type { CreateTaskData, UpdateTaskData, Task } from '@/types/task.types';

export async function createTask(data: CreateTaskData) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Unauthorized' };
    }

    const { error } = await supabase.from('tasks').insert({
      user_id: user.id,
      title: data.title,
      description: data.description || null,
      priority: data.priority,
      due_date: data.due_date && data.due_date.trim() !== '' ? data.due_date : null,
      completed: false,
    });

    if (error) {
      console.error('Create task error:', error);
      return { error: 'Failed to create task. Please try again.' };
    }

    revalidatePath(ROUTES.TASKS);
    return { success: true };
  } catch (error) {
    return { error: 'An unexpected error occurred' };
  }
}

export async function updateTask(taskId: string, data: UpdateTaskData) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Unauthorized' };
    }

    const { error } = await supabase
      .from('tasks')
      .update({
        title: data.title,
        description: data.description,
        priority: data.priority,
        due_date: data.due_date && data.due_date.trim() !== '' ? data.due_date : null,
        completed: data.completed,
      })
      .eq('id', taskId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Update task error:', error);
      return { error: 'Failed to update task. Please try again.' };
    }

    revalidatePath(ROUTES.TASKS);
    return { success: true };
  } catch (error) {
    return { error: 'An unexpected error occurred' };
  }
}

export async function deleteTask(taskId: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Unauthorized' };
    }

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Delete task error:', error);
      return { error: 'Failed to delete task. Please try again.' };
    }

    return { success: true };
  } catch (error) {
    return { error: 'An unexpected error occurred' };
  }
}

export async function getTasks(page: number = 1, limit: number = 9) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Unauthorized', tasks: [], totalCount: 0 };
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from('tasks')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Get tasks error:', error);
      return { error: 'Failed to load tasks. Please try again.', tasks: [], totalCount: 0 };
    }

    return { 
      tasks: (data as Task[]) || [], 
      totalCount: count || 0,
      error: null 
    };
  } catch (error) {
    return { error: 'An unexpected error occurred', tasks: [], totalCount: 0 };
  }
}

