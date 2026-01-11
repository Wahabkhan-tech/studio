'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { UserNav } from '@/components/user-nav';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Fragment } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Home, Package, Users, Building, Book, LineChart, Cog, UserCog, ClipboardList, CalendarCheck, PanelLeft, Search, User, MessageSquare, FilePen, Lock } from 'lucide-react';
import { groups, students } from '@/lib/data';
import { cn } from '@/lib/utils';

type HeaderProps = {
  role: 'admin' | 'teacher' | 'student';
};

export function Header({ role }: HeaderProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // In a real app, this data would come from auth/session state.
  const loggedInStudent = students[0];
  const myGroup = groups.find((g) => g.memberIds.includes(loggedInStudent.id));
  const isProfileComplete = myGroup?.proposal.status === 'APPROVED';

  const breadcrumbItems = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;
    let label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

    if (segment === myGroup?.id) {
        label = myGroup?.name || label;
    }


    return (
      <Fragment key={href}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{label}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={href}>{label}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </Fragment>
    );
  });

  const adminNav = (
    <>
      <Link href="/admin/dashboard" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><Home className="h-5 w-5" />Dashboard</Link>
      <Link href="/admin/teachers" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><Users className="h-5 w-5" />Teachers</Link>
      <Link href="/admin/students" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><Users className="h-5 w-5" />Students</Link>
      <Link href="/admin/departments" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><Building className="h-5 w-5" />Departments</Link>
      <Link href="/admin/groups" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><Package className="h-5 w-5" />Groups</Link>
      <Link href="/admin/proposals" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><Book className="h-5 w-5" />Proposals</Link>
      <Link href="/admin/reports" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><LineChart className="h-5 w-5" />Reports</Link>
      <Link href="/admin/chat" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><MessageSquare className="h-5 w-5" />Chat</Link>
      <Link href="/admin/settings" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><Cog className="h-5 w-5" />Settings</Link>
    </>
  );

  const teacherNav = (
    <>
      <Link href="/teacher/dashboard" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><Home className="h-5 w-5" />Dashboard</Link>
      <Link href="/teacher/groups" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><Package className="h-5 w-5" />My Groups</Link>
      <Link href="/teacher/proposals" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><Book className="h-5 w-5" />Proposal Review</Link>
      <Link href="/teacher/attendance" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><CalendarCheck className="h-5 w-5" />Attendance</Link>
      <Link href="/teacher/tasks" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><ClipboardList className="h-5 w-5" />Tasks Review</Link>
      <Link href="/teacher/sessions" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><Users className="h-5 w-5" />Sessions</Link>
      <Link href="/teacher/chat" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><MessageSquare className="h-5 w-5" />Chat</Link>
      <Link href="/teacher/evaluation" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><FilePen className="h-5 w-5" />Evaluation</Link>
      <Link href="/teacher/profile" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><User className="h-5 w-5" />Profile</Link>
    </>
  );

  const studentNav = (
    <>
       <Link href={isProfileComplete ? "/student/dashboard" : "/student/onboarding"} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><Home className="h-5 w-5" />Dashboard</Link>
      <Link href={myGroup ? `/student/groups/${myGroup?.id}` : "/student/groups"} className={cn("flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground", isProfileComplete ? "hover:text-foreground" : "")}>
         {isProfileComplete ? <Package className="h-5 w-5" /> : <Search className="h-5 w-5" />}
        {myGroup ? "My Group" : "Find Group"}
      </Link>
      <Link href={isProfileComplete ? "/student/tasks" : "#"} className={cn("flex items-center gap-4 px-2.5", isProfileComplete ? "text-muted-foreground hover:text-foreground" : "text-muted-foreground/50 cursor-not-allowed")}><ClipboardList className="h-5 w-5" />Tasks</Link>
      <Link href={isProfileComplete ? "/student/sessions" : "#"} className={cn("flex items-center gap-4 px-2.5", isProfileComplete ? "text-muted-foreground hover:text-foreground" : "text-muted-foreground/50 cursor-not-allowed")}><Users className="h-5 w-5" />Sessions</Link>
      <Link href={isProfileComplete ? "/student/chat" : "#"} className={cn("flex items-center gap-4 px-2.5", isProfileComplete ? "text-muted-foreground hover:text-foreground" : "text-muted-foreground/50 cursor-not-allowed")}><MessageSquare className="h-5 w-5" />Chat</Link>
      <Link href="/student/profile" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"><User className="h-5 w-5" />Profile</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              {role === 'admin' && <Users className="h-5 w-5 transition-all group-hover:scale-110" />}
              {role === 'teacher' && <UserCog className="h-5 w-5 transition-all group-hover:scale-110" />}
              {role === 'student' && <User className="h-5 w-5 transition-all group-hover:scale-110" />}
              <span className="sr-only">Protracks</span>
            </Link>
            {role === 'admin' && adminNav}
            {role === 'teacher' && teacherNav}
            {role === 'student' && studentNav}
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Can add a search bar here if needed */}
      </div>
      <UserNav role={role} />
    </header>
  );
}
