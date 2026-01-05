
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { departments } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function DepartmentManagementPage() {
  return (
    <div className="grid gap-6 md:grid-cols-5">
      <div className="md:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Departments</CardTitle>
            <CardDescription>
              Viewing all academic departments in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department Name</TableHead>
                  <TableHead>Department Head</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell className="font-medium">
                      <Link href={`/admin/departments/${dept.id}/teachers`} className="text-primary hover:underline">
                        {dept.name}
                      </Link>
                    </TableCell>
                    <TableCell>{dept.head}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Create Department</CardTitle>
            <CardDescription>
              Add a new academic department.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dept-name">Department Name</Label>
              <Input id="dept-name" placeholder="e.g., Information Technology" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="dept-head">Department Head (Optional)</Label>
              <Input id="dept-head" placeholder="Select a teacher" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
