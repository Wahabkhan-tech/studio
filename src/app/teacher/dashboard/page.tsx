import { groups, teachers } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Book, CalendarCheck, Package } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function TeacherDashboard() {
  const loggedInTeacherId = teachers[0].id;
  const assignedGroups = groups.filter((g) => g.supervisorId === loggedInTeacherId);
  const pendingProposals = assignedGroups.filter(
    (g) => g.proposal.status === 'PENDING'
  ).length;

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Groups</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedGroups.length}</div>
            <p className="text-xs text-muted-foreground">You are supervising {assignedGroups.length} groups this semester.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Proposals</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingProposals}</div>
            <p className="text-xs text-muted-foreground">Awaiting your review.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Today</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/2 Marked</div>
            <p className="text-xs text-muted-foreground">All attendance for today submitted.</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                <CardTitle>My Groups</CardTitle>
                <CardDescription>
                    Overview of your supervised groups' progress.
                </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/teacher/groups">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                </Link>
                </Button>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
                {assignedGroups.map(group => (
                    <Link href={`/teacher/groups/${group.id}`} key={group.id}>
                        <Card className="hover:bg-muted/50 transition-colors">
                            <CardHeader>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <CardTitle>{group.name}</CardTitle>
                                        <CardDescription>{group.projectTitle}</CardDescription>
                                    </div>
                                    <Badge variant={group.status === 'ACTIVE' ? 'default' : 'secondary'}>{group.status}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-muted-foreground">{group.progress}% Complete</span>
                                    <Progress value={group.progress} className="flex-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

    