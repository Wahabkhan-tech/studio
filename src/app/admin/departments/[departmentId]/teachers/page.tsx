
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
import { departments, teachers, groups as allGroups } from '@/lib/data';
import Link from 'next/link';

export default function TeachersByDepartmentPage({ params }: { params: { departmentId: string } }) {
  const department = departments.find(d => d.id === params.departmentId);

  if (!department) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Department Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The department you are looking for does not exist.</p>
        </CardContent>
      </Card>
    );
  }

  const departmentTeachers = teachers.filter(t => t.department === department.name);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teachers in {department.name}</CardTitle>
        <CardDescription>
          Viewing all teachers associated with the {department.name} department.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Assigned Groups</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departmentTeachers.map((teacher) => {
              const assignedGroupsCount = allGroups.filter(g => g.supervisorId === teacher.id).length;
              return (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">
                  <Link href={`/admin/teachers/${teacher.id}/groups`} className="text-primary hover:underline">
                    {teacher.name}
                  </Link>
                </TableCell>
                <TableCell>{teacher.designation}</TableCell>
                <TableCell>{assignedGroupsCount}</TableCell>
              </TableRow>
            )})}
             {departmentTeachers.length === 0 && (
                <TableRow>
                    <TableCell colSpan={3} className="text-center">
                        No teachers found in this department.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
