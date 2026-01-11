
import Link from 'next/link';
import {
  Book,
  ClipboardList,
  Home,
  MessageSquare,
  Package,
  User,
  Users,
  ShieldQuestion,
  Lock,
  Search,
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
import { redirect } from 'next/navigation';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, this data would come from auth/session state.
  // We simulate it here for demonstration.
  const loggedInStudent = students[0];
  const myGroup = groups.find((g) => g.memberIds.includes(loggedInStudent.id));
  const isProfileComplete = myGroup?.proposal.status === 'APPROVED';
  
  // This logic should be adapted when real authentication is in place.
  // For now, we manually control it. Uncomment the line below to test the redirect.
  // if (!isProfileComplete) redirect('/student/onboarding');

  const lockedTooltip = "Complete onboarding to unlock.";

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
                    className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8", isProfileComplete ? "hover:text-foreground" : "")}
                  >
                    {isProfileComplete ? <Package className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                    <span className="sr-only">{myGroup ? "My Group" : "Find Group"}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{myGroup ? "My Group" : "Find Group"}</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={isProfileComplete ? "/student/tasks" : "#"}
                    className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8", isProfileComplete ? "hover:text-foreground" : "cursor-not-allowed opacity-50")}
                  >
                    {isProfileComplete ? <ClipboardList className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                    <span className="sr-only">Tasks</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{isProfileComplete ? "Tasks" : lockedTooltip}</TooltipContent>
              </Tooltip>

               <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={isProfileComplete ? "/student/sessions" : "#"}
                    className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8", isProfileComplete ? "hover:text-foreground" : "cursor-not-allowed opacity-50")}
                  >
                    {isProfileComplete ? <Users className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                    <span className="sr-only">Sessions</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{isProfileComplete ? "Sessions" : lockedTooltip}</TooltipContent>
              </Tooltip>

               <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={isProfileComplete ? "/student/chat" : "#"}
                    className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8", isProfileComplete ? "hover:text-foreground" : "cursor-not-allowed opacity-50")}
                  >
                    {isProfileComplete ? <MessageSquare className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                    <span className="sr-only">Chat</span>
                  </Link>
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
