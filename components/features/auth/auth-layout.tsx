 
'use client';

import React, { ReactNode } from 'react';
import { CheckCircle2, Zap, Shield, TrendingUp } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
  imageUrl?: string;
}

export function AuthLayout({ children, imageUrl }: AuthLayoutProps) {
  const features = [
    {
      icon: CheckCircle2,
      title: 'Task Management',
      description: 'Organize and track your tasks efficiently',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built for speed and performance',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected',
    },
    {
      icon: TrendingUp,
      title: 'Boost Productivity',
      description: 'Get more done in less time',
    },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex justify-center order-2 lg:order-1">
            {children}
          </div>

          <div className="hidden lg:flex flex-col justify-center space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-primary">
                  Modern Task Management
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Organize your work,
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  achieve more
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join thousands of professionals who trust TaskDesk to streamline their workflow and boost productivity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300 -z-10" />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-xs font-semibold text-primary-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold">
                  10,000+ Users
                </p>
                <p className="text-xs text-muted-foreground">
                  Join our growing community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}