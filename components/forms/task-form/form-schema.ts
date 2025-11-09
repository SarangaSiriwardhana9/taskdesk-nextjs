import { z } from 'zod';
import { TASK_DEFAULTS } from '@/lib/constants';

const priorityEnum = TASK_DEFAULTS.PRIORITIES;

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  priority: z.enum(priorityEnum, {
    message: 'Please select a priority',
  }),
  due_date: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;

