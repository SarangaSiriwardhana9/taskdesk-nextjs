import { User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: AuthError | null;
}

export interface AuthResponse {
  error?: string;
  success?: boolean;
  message?: string;
  redirect?: string;
}

