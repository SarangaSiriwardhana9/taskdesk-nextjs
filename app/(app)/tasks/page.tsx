'use client';

import { useAuthUser } from '@/lib/stores/auth-store';

export default function TasksPage() {
  const user = useAuthUser();

  return (
    <main className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">My Tasks</h1>
            <p className="text-muted-foreground mt-2">Manage your tasks efficiently</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Authentication Successful!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Welcome, {user?.name}! <br />
                Your task management dashboard will be built here.
              </p>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  User ID: <code className="bg-muted px-2 py-1 rounded">{user?.id}</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}