'use client';

import { Button } from '@/components/ui/button';
import { useIsAuthenticated } from '@/lib/stores/auth-store';
import { Sparkles, Zap, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

export function HeroSection() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <section className="relative flex items-center justify-center py-16  ">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
 
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary animate-spin" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Next-Gen Task Management
            </span>
          </div>

 
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
              <span className="text-primary">Task</span>Desk
            </h1>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-muted-foreground">
              Where productivity meets
              <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-black">
                Pure Simplicity
              </span>
            </h2>
          </div>

 
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            Create, organize, and conquer your goals with an interface so intuitive, it feels like magic.
          </p>

 
          <div>
            <Link href={isAuthenticated ? ROUTES.TASKS : ROUTES.AUTH}>
              <Button 
                size="lg" 
                className="gap-2"
              >
                {isAuthenticated ? (
                  <>
                    <Target className="h-5 w-5" />
                    Launch TaskDesk
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    Start Your Journey
                  </>
                )}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}