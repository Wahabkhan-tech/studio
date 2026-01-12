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
  let userId, userName, userEmail, userAvatarId;

  // In a real app, you'd get the logged-in user's data from a session or context.
  // Here, we'll just pick the first one from the mock data for demonstration.
  switch (role) {
    case 'admin':
      userId = 'admin';
      userName = 'Admin User';
      userEmail = 'admin@protracks.com';
      userAvatarId = '10'; // Using teacher avatar for admin
      break;
    case 'teacher':
      const teacher = teachers[0];
      userId = teacher.id;
      userName = teacher.name;
      userEmail = teacher.email;
      userAvatarId = teacher.avatar;
      break;
    case 'student':
      const student = students[0];
      userId = student.id;
      userName = student.name;
      userEmail = student.email;
      userAvatarId = student.avatar;
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
                alt={userName || 'User'}
                data-ai-hint={avatar.imageHint}
              />
            )}
            <AvatarFallback>{userName ? userName.charAt(0) : 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {role === 'student' && (
            <DropdownMenuItem asChild>
              <Link href="/student/profile">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
          )}
           {role === 'teacher' && (
            <DropdownMenuItem asChild>
              <Link href="/teacher/profile">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
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
