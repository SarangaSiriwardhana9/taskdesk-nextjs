'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { ROUTES } from '@/lib/constants';

interface UpdateProfileData {
  name: string;
}

export async function updateProfile(data: UpdateProfileData) {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { error: 'User not authenticated' };
    }

    // Update the profiles table
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        display_name: data.name,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Profile update error:', updateError);
      return { error: 'Failed to update profile' };
    }

    // Update auth user metadata
    const { error: authUpdateError } = await supabase.auth.updateUser({
      data: {
        full_name: data.name,
      }
    });

    if (authUpdateError) {
      console.error('Auth metadata update error:', authUpdateError);
      // Don't return error here as profile was updated successfully
    }

    revalidatePath(ROUTES.PROFILE);
    
    return { 
      success: true,
      user: {
        id: user.id,
        name: data.name,
        email: user.email || '',
        avatar: user.user_metadata?.avatar_url,
      }
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return { error: 'An unexpected error occurred' };
  }
}
