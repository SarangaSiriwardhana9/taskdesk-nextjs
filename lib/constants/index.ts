export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  TASKS: '/tasks',
  PROFILE: '/profile',
} as const;

export const TOAST_MESSAGES = {
  AUTH: {
    SIGN_IN_SUCCESS: 'Successfully signed in!',
    SIGN_UP_SUCCESS: 'Successfully signed up!',
    SIGN_UP_EMAIL_CONFIRMATION: 'Success! Please check your email to confirm your account before signing in.',
    SIGN_IN_ERROR: 'An error occurred during sign in',
    SIGN_UP_ERROR: 'An error occurred during sign up',
    TERMS_REQUIRED: 'Please agree to the terms and conditions',
  },
  PROFILE: {
    UPDATE_SUCCESS: 'Profile updated successfully!',
    UPDATE_ERROR: 'Failed to update profile',
  },
  TASKS: {
    CREATE_SUCCESS: 'Task created successfully!',
    CREATE_ERROR: 'Failed to create task',
    UPDATE_SUCCESS: 'Task updated successfully!',
    UPDATE_ERROR: 'Failed to update task',
    DELETE_SUCCESS: 'Task deleted successfully!',
    DELETE_ERROR: 'Failed to delete task',
    COMPLETE_SUCCESS: 'Task marked as completed!',
    INCOMPLETE_SUCCESS: 'Task marked as incomplete!',
  },
} as const;

export const CONFIG = {
  REDIRECT_DELAY: 300,
  HEADER_SCROLL_THRESHOLD: 20,
  TASK_GRID_LAYOUT: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  SKELETON_COUNTS: {
    HEADER: 5,
    TASKS: 6,
  },
  PAGINATION: {
    TASKS_PER_PAGE: 9,
    MAX_VISIBLE_PAGES: 5,
  },
} as const;