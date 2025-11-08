'use client';

import { Button } from '@/components/ui/button';
import { useIsAuthenticated } from '@/lib/stores/auth-store';
import { Sparkles, Zap, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

export function HeroSection() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <section className="relative flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 lg:space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
            <div className="relative">
              <Sparkles className="h-5 w-5 text-primary animate-spin" />
              <div className="absolute inset-0 h-5 w-5 text-accent animate-ping opacity-20">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Next-Gen Task Management
            </span>
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight">
              <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">T</span>
              <span className="inline-block hover:scale-110 transition-transform duration-300 delay-75 cursor-default">a</span>
              <span className="inline-block hover:scale-110 transition-transform duration-300 delay-150 cursor-default">s</span>
              <span className="inline-block hover:scale-110 transition-transform duration-300 delay-225 cursor-default">k</span>
              <span className="inline-block hover:scale-110 transition-transform duration-300 delay-300 cursor-default text-primary">D</span>
              <span className="inline-block hover:scale-110 transition-transform duration-300 delay-375 cursor-default text-accent">e</span>
              <span className="inline-block hover:scale-110 transition-transform duration-300 delay-450 cursor-default text-primary">s</span>
              <span className="inline-block hover:scale-110 transition-transform duration-300 delay-525 cursor-default text-accent">k</span>
            </h1>
            
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-muted-foreground">
                Where productivity meets
                <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-300% font-black">
                  Pure Simplicity
                </span>
              </h2>
              <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-primary/30 rounded-full animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-6 h-6 border-2 border-accent/30 rounded-full animate-pulse delay-500" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Experience task management like never before. 
              <span className="text-primary font-semibold hover:text-accent transition-colors cursor-default"> Create</span>,
              <span className="text-accent font-semibold hover:text-primary transition-colors cursor-default"> organize</span>, and
              <span className="text-primary font-semibold hover:text-accent transition-colors cursor-default"> conquer</span> your goals
              with an interface so intuitive, it feels like magic.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {isAuthenticated ? (
              <Link href={ROUTES.TASKS}>
                <Button 
                  variant="gradient" 
                  size="lg" 
                  className="group relative px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    <Target className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Launch TaskDesk
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
                </Button>
              </Link>
            ) : (
              <Link href={ROUTES.AUTH}>
                <Button 
                  variant="gradient" 
                  size="lg" 
                  className="group relative px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Start Your Journey
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
