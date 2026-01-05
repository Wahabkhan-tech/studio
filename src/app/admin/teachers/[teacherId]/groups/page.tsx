
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
import { Badge } from '@/components/ui/badge';
import { teachers, groups } from '@/lib/data';
import Link from 'next/link';

export default function GroupsByTeacherPage({ params }: { params: { teacherId: string } }) {
  const teacher = teachers.find(t => t.id === params.teacherId);

  if (!teacher) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Teacher Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The teacher you are looking for does not exist.</p>
        </CardContent>
      </Card>
    );
  }

  const supervisedGroups = groups.filter(g => g.supervisorId === teacher.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Groups Supervised by {teacher.name}</CardTitle>
        <CardDescription>
          Viewing all groups associated with this teacher.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead>Project Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Members</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supervisedGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className="font-medium">
                   <Link href={`/admin/groups/${group.id}`} className="text-primary hover:underline">
                    {group.name}
                  </Link>
                </TableCell>
                <TableCell>{group.projectTitle}</TableCell>
                <TableCell>
                  <Badge variant={group.status === 'ACTIVE' ? 'secondary' : 'outline'}>
                    {group.status}
                  </Badge>
                </TableCell>
                <TableCell>{group.memberIds.length}</TableCell>
              </TableRow>
            ))}
            {supervisedGroups.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center">
                        This teacher is not supervising any groups.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
