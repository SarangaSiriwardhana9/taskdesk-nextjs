'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { profileSchema, type ProfileFormData } from './form-schema';
import { User, Mail, Save } from 'lucide-react';
import { TOAST_MESSAGES } from '@/lib/constants/toast-messages';

interface ProfileFormProps {
  initialData: {
    name: string;
    email: string;
  };
  onSubmit?: (data: ProfileFormData) => void;
}

export function ProfileForm({ initialData, onSubmit }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  });

      const onSubmitForm = async (data: ProfileFormData) => {
        setIsLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          const { email, ...updateData } = data;
          toast.success(TOAST_MESSAGES.PROFILE.UPDATE_SUCCESS);
          onSubmit?.(updateData as ProfileFormData);
        } catch (error) {
          toast.error(TOAST_MESSAGES.PROFILE.UPDATE_ERROR);
        } finally {
          setIsLoading(false);
        }
      };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and account details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name
            </label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register('name')}
              disabled={isLoading}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              disabled={true}
              aria-invalid={errors.email ? 'true' : 'false'}
              className="bg-muted cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Mail className="h-3 w-3" />
              Email cannot be changed as it's linked to your account authentication
            </p>
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" variant="foreground" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

