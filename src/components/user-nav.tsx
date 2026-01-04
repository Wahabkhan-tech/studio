'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { students, teachers } from '@/lib/data';
import { UserRole } from '@/lib/types';
import { Building, CreditCard, LogOut, Settings, User } from 'lucide-react';

type UserNavProps = {
  role: UserRole;
};

export function UserNav({ role }: UserNavProps) {
  let user, userEmail, userAvatarId, roleLabel;

  switch (role) {
    case 'admin':
      user = 'Admin User';
      userEmail = 'admin@capstone.flow';
      userAvatarId = '10';
      roleLabel = 'Administrator';
      break;
    case 'teacher':
      user = teachers[0].name;
      userEmail = teachers[0].email;
      userAvatarId = teachers[0].avatar;
      roleLabel = 'Teacher';
      break;
    case 'student':
      user = students[0].name;
      userEmail = students[0].email;
      userAvatarId = students[0].avatar;
      roleLabel = 'Student';
      break;
  }

  const avatar = PlaceHolderImages.find((img) => img.id === userAvatarId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            {avatar && (
              <AvatarImage
                src={avatar.imageUrl}
                alt={user || 'User'}
                data-ai-hint={avatar.imageHint}
              />
            )}
            <AvatarFallback>{user ? user.charAt(0) : 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user}</p>
            <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {role === 'student' && (
            <DropdownMenuItem asChild>
              <Link href="/student/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
          )}
          {role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
          )}
           {role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link href="/admin/departments">
                <Building className="mr-2 h-4 w-4" />
                <span>Departments</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
