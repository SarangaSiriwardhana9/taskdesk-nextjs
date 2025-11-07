'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { SignInData, SignUpData } from '@/types/auth.types';

export async function signIn(data: SignInData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  return { success: true, redirect: '/tasks' };
}

export async function signUp(data: SignUpData) {
  const supabase = await createClient();

  const { data: signUpData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (signUpData?.user && !signUpData.session) {
    return { 
      success: true,
      message: 'Success! Please check your email to confirm your account before signing in.'
    };
  }

  revalidatePath('/', 'layout');
  return { success: true, redirect: '/tasks' };
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/auth');
}

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

