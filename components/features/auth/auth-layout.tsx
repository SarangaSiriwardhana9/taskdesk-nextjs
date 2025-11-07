 
'use client';

import React, { ReactNode } from 'react';
import { ThemeToggle } from '../theme/theme-toggle';

interface AuthLayoutProps {
  children: ReactNode;
  imageUrl?: string;
}

export function AuthLayout({ children, imageUrl }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 right-0 p-6 z-50">
        <ThemeToggle />
      </header>

      {/* Main Container */}
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Form Section */}
          <div className="flex justify-center">
            {children}
          </div>

          {/* Image Section */}
          {imageUrl && (
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-border">
                <img
                  src={imageUrl}
                  alt="Authentication illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}