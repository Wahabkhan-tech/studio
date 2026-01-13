
'use client';
import Link from 'next/link';
import {
  ClipboardList,
  Home,
  MessageSquare,
  Package,
  User,
  Search,
  Lock,
  Users
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Header } from '@/components/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { groups, students } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useRoleGuard } from '@/hooks/use-role-guard.tsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const guard = useRoleGuard('student');
  const pathname = usePathname();
  
  const [myGroup, setMyGroup] = useState<typeof groups[0] | undefined>(undefined);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  
  useEffect(() => {
    const loggedInStudent = students.find(s => s.id === 'EB22210006139');
    const group = groups.find((g) => g.memberIds.includes(loggedInStudent?.id || ''));
    setMyGroup(group);
    setIsProfileComplete(!!group && group.proposal.status === 'APPROVED');
  }, [pathname]);


  if (guard) {
    return guard;
  }

  const lockedTooltip = "Complete onboarding to unlock.";

  const renderLockedItem = (icon: React.ReactNode, label: string) => (
    <span
      className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8", "cursor-not-allowed opacity-50")}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </span>
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href={isProfileComplete ? "/student/dashboard" : "/student/onboarding"}
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <User className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Protracks</span>
            </Link>
            <TooltipProvider>
               <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={isProfileComplete ? "/student/dashboard" : "/student/onboarding"}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={myGroup ? `/student/groups/${myGroup?.id}` : "/student/groups"}
                    className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8")}
                  >
                    {myGroup ? <Package className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                    <span className="sr-only">{myGroup ? "My Group" : "Find Group"}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{myGroup ? "My Group" : "Find Group"}</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  {isProfileComplete ? (
                    <Link
                      href="/student/tasks"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                      <ClipboardList className="h-5 w-5" />
                      <span className="sr-only">Tasks</span>
                    </Link>
                  ) : (
                    renderLockedItem(<Lock className="h-5 w-5" />, "Tasks")
                  )}
                </TooltipTrigger>
                <TooltipContent side="right">{isProfileComplete ? "Tasks" : lockedTooltip}</TooltipContent>
              </Tooltip>

               <Tooltip>
                <TooltipTrigger asChild>
                  {isProfileComplete ? (
                    <Link
                      href="/student/sessions"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                      <Users className="h-5 w-5" />
                      <span className="sr-only">Sessions</span>
                    </Link>
                  ) : (
                     renderLockedItem(<Lock className="h-5 w-5" />, "Sessions")
                  )}
                </TooltipTrigger>
                <TooltipContent side="right">{isProfileComplete ? "Sessions" : lockedTooltip}</TooltipContent>
              </Tooltip>

               <Tooltip>
                <TooltipTrigger asChild>
                  {isProfileComplete ? (
                    <Link
                      href="/student/chat"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span className="sr-only">Chat</span>
                    </Link>
                  ) : (
                     renderLockedItem(<Lock className="h-5 w-5" />, "Chat")
                  )}
                </TooltipTrigger>
                <TooltipContent side="right">{isProfileComplete ? "Chat" : lockedTooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/student/profile"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Profile</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header role="student" />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
