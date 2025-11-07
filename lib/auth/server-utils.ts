import { createClient } from '@/lib/supabase/server';

export async function getServerUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return {
      id: user.id,
      name: user.user_metadata?.full_name || user.email || 'User',
      email: user.email || '',
      avatar: user.user_metadata?.avatar_url,
    };
  } catch {
    return null;
  }
}