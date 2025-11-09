'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { UserMenu } from './user-menu';
import { useAuthUser, useAuthLoading, useIsAuthenticated } from '@/lib/stores/auth-store';
import { LogIn, CheckSquare } from 'lucide-react';
import { ROUTES, CONFIG } from '@/lib/constants';

export const Header = React.memo(function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useAuthUser();
  const isLoading = useAuthLoading();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > CONFIG.HEADER_SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderAuthButton = useMemo(() => {
    if (isLoading) {
      return <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />;
    }

    if (isAuthenticated && user) {
      return <UserMenu user={user} />;
    }

    return (
      <Link href={ROUTES.AUTH}>
        <Button variant="outline" size="default" className="gap-2">
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
      </Link>
    );
  }, [isLoading, isAuthenticated, user]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-primary/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110">
              <CheckSquare className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-foreground">Task</span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Desk</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {renderAuthButton}
            <ThemeToggle />
          </div>
        </div>
      </div>

      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      )}
    </header>
  );
});