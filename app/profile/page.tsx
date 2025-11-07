'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';
import { ProfileForm } from '@/components/forms/profile-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Calendar, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <Spinner />
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const userData = {
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <main className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Profile Settings</h1>
              <p className="text-muted-foreground mt-2">
                Manage your account information and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="lg:sticky lg:top-24">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-lg shadow-primary/30">
                          {userData.avatar ? (
                            <img
                              src={userData.avatar}
                              alt={userData.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            getInitials(userData.name)
                          )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-background border-4 border-background flex items-center justify-center">
                          <div className="w-full h-full rounded-full bg-green-500 border-2 border-background"></div>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{userData.name}</CardTitle>
                    <CardDescription className="text-sm break-all">{userData.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground">Email</p>
                          <p className="text-muted-foreground break-all">{userData.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground">Member Since</p>
                          <p className="text-muted-foreground">
                            Recently
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <Shield className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground">Account Status</p>
                          <p className="text-muted-foreground">Verified</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <ProfileForm
                  initialData={{
                    name: userData.name,
                    email: userData.email,
                  }}
                />

                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>
                      Manage your password and security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border border-border bg-card/50">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium text-foreground">Password</p>
                            <p className="text-sm text-muted-foreground">
                              Last updated recently
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          Change Password
                        </Button>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border border-border bg-card/50">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium text-foreground">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" disabled className="w-full sm:w-auto">
                          Coming Soon
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}

