'use client';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/stores/auth-store';
import { CheckCircle2, Zap, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  return (
    <main className="min-h-screen bg-background pt-16">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-primary">
                  Modern Task Management
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                Organize your work,
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  achieve more
                </span>
              </h1>

              <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
                The most intuitive task management platform for teams and individuals. 
                Stay organized, collaborate effortlessly, and boost your productivity.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {isAuthenticated ? (
                  <Link href="/tasks">
                    <Button variant="gradient" size="lg" className="gap-2">
                      <span>Go to Dashboard</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/auth">
                      <Button variant="gradient" size="lg" className="gap-2">
                        <span>Get Started</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg">
                      Watch Demo
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Everything you need to succeed
              </h2>
              <p className="text-lg text-muted-foreground">
                Powerful features to help you manage tasks efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: CheckCircle2,
                  title: 'Task Management',
                  description: 'Create, organize, and track tasks with ease',
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
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 border border-primary/20 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -z-10" />
              
              <div className="text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Ready to get started?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of professionals who trust TaskDesk to manage their work
                </p>
                {isAuthenticated ? (
                  <Link href="/tasks">
                    <Button variant="gradient" size="lg" className="gap-2">
                      <span>Go to Dashboard</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth">
                    <Button variant="gradient" size="lg" className="gap-2">
                      <span>Start Free Trial</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-muted-foreground">
              <p>&copy; 2024 TaskDesk. All rights reserved.</p>
            </div>
          </div>
        </footer>
    </main>
  );
}
