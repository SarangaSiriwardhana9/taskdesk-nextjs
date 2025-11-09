'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/lib/stores/auth-store';
import { signOut } from '@/lib/auth/actions';
import { ROUTES } from '@/lib/constants';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const [avatarError, setAvatarError] = useState(false);
  const { clearAuth } = useAuthStore();

  const handleLogout = async () => {
    clearAuth();
    await signOut();
  };

  const getInitials = (name: string) => {
    if (!name || name.trim() === '') return 'U';
    return name
      .trim()
      .split(' ')
      .filter(n => n.length > 0)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 p-0"
        >
          {user.avatar && !avatarError ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-full w-full rounded-full object-cover"
              onError={() => setAvatarError(true)}
            />
          ) : (
            <span className="text-xs font-semibold">{getInitials(user.name)}</span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push(ROUTES.TASKS)}>
          <CheckSquare className="mr-2 h-4 w-4" />
          My Tasks
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push(ROUTES.PROFILE)}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}