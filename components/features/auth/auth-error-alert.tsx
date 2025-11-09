'use client';

 
import { AlertCircle, X } from 'lucide-react';

interface AuthErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export function AuthErrorAlert({ message, onClose }: AuthErrorAlertProps) {
  return (
    <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-destructive" />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="text-sm font-semibold text-destructive">
            Authentication Error
          </h3>
          <p className="text-sm text-foreground/80">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-lg p-1 hover:bg-destructive/20 transition-colors"
          >
            <X className="h-4 w-4 text-destructive" />
          </button>
        )}
      </div>
    </div>
  );
}

