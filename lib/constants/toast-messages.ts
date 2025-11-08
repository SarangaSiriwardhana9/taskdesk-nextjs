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

