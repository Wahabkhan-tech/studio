'use client';
import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  BookCheck,
  Package,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { groups, students, teachers } from '@/lib/data';
import { useActivity } from '@/context/ActivityContext';
import { ScrollArea } from '@/components/ui/scroll-area';

const iconMap: { [key: string]: React.ReactNode } = {
  teacher: <Users className="h-8 w-8 text-muted-foreground" />,
  proposal: <BookCheck className="h-8 w-8 text-muted-foreground" />,
  group: <Package className="h-8 w-8 text-muted-foreground" />,
  student: <Users className="h-8 w-8 text-muted-foreground" />,
  system: <Activity className="h-8 w-8 text-muted-foreground" />,
  department: <Activity className="h-8 w-8 text-muted-foreground" />,
};


export default function AdminDashboard() {
  const { activities } = useActivity();
  const totalTeachers = teachers.length;
  const totalStudents = students.length;
  const activeGroups = groups.filter((g) => g.status === 'ACTIVE').length;
  const approvedProposals = groups.filter((g) => g.proposal.status === 'APPROVED').length;
  const recentGroups = groups.slice(0, 5);

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeachers}</div>
            <p className="text-xs text-muted-foreground">+2 since last semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">+180 since last semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeGroups}</div>
            <p className="text-xs text-muted-foreground">+5 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Proposals</CardTitle>
            <BookCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedProposals}</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Groups</CardTitle>
              <CardDescription>
                An overview of recently formed student groups.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/admin/groups">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Supervisor</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-right">Members</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentGroups.map((group) => {
                  const supervisor = teachers.find((t) => t.id === group.supervisorId);
                  return (
                    <TableRow key={group.id}>
                      <TableCell>
                        <div className="font-medium">{group.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {group.projectTitle}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {supervisor?.name}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant={group.status === 'ACTIVE' ? 'secondary' : 'outline'}>
                          {group.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{group.memberIds.length}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
         <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
               <CardDescription>
                A log of recent system-wide activities.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 grid gap-8">
              <ScrollArea className="h-[300px]">
                {activities.length > 0 ? activities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 mb-4">
                    {iconMap[activity.type] || iconMap['system']}
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.message}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                    <p>No recent activity.</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}