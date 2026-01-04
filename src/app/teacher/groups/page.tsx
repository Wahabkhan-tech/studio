import { groups } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function MyGroupsPage() {
  const assignedGroups = groups.filter((g) => g.supervisorId === 't1');

  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold">My Groups</h1>
            <p className="text-muted-foreground">
                Here are all the groups you are currently supervising.
            </p>
        </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {assignedGroups.map((group) => (
          <Link href={`/teacher/groups/${group.id}`} key={group.id}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{group.name}</CardTitle>
                  <Badge variant={group.status === 'ACTIVE' ? 'default' : 'outline'}>{group.status}</Badge>
                </div>
                <CardDescription>{group.projectTitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                    <p className="text-sm font-medium">Progress</p>
                    <div className="flex items-center gap-4">
                        <Progress value={group.progress} />
                        <span className="text-sm font-bold">{group.progress}%</span>
                    </div>
                     <div className="text-sm text-muted-foreground pt-2">
                        {group.memberIds.length} members
                    </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
