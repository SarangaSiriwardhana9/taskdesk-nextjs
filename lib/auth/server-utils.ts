import { createClient } from '@/lib/supabase/server';

export async function getServerUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.user_metadata?.full_name || user.email || 'User',
      email: user.email || '',
      avatar: user.user_metadata?.avatar_url,
    };
  } catch (error) {
    return null;
  }
}

