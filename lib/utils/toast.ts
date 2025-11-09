import { toast } from 'sonner';

const toastStyles = {
  success: {
    '--normal-bg': 'var(--background)',
    '--normal-text': 'hsl(142 76% 36%)', // green-600
    '--normal-border': 'hsl(142 76% 36%)',
  } as React.CSSProperties,
  
  error: {
    '--normal-bg': 'var(--background)',
    '--normal-text': 'var(--destructive)',
    '--normal-border': 'var(--destructive)',
  } as React.CSSProperties,
  
  warning: {
    '--normal-bg': 'var(--background)',
    '--normal-text': 'hsl(38 92% 50%)', // amber-500
    '--normal-border': 'hsl(38 92% 50%)',
  } as React.CSSProperties,
  
  info: {
    '--normal-bg': 'var(--background)',
    '--normal-text': 'hsl(221 83% 53%)', // blue-500
    '--normal-border': 'hsl(221 83% 53%)',
  } as React.CSSProperties,
};

export const toastVariants = {
  success: (message: string, description?: string) => {
    return toast.success(message, {
      description,
      style: toastStyles.success,
    });
  },
  
  error: (message: string, description?: string) => {
    return toast.error(message, {
      description,
      style: toastStyles.error,
    });
  },
  
  warning: (message: string, description?: string) => {
    return toast.warning(message, {
      description,
      style: toastStyles.warning,
    });
  },
  
  info: (message: string, description?: string) => {
    return toast.info(message, {
      description,
      style: toastStyles.info,
    });
  },
};
