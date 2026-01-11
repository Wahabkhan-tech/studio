

'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { departments as initialDepartments } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import type { Department } from '@/lib/types';

export default function DepartmentManagementPage() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptHead, setNewDeptHead] = useState('');
  const { toast } = useToast();

  const handleAddDepartment = () => {
    if (!newDeptName.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Department name cannot be empty.',
      });
      return;
    }
    const newDepartment: Department = {
      id: `dept-${Date.now()}`,
      name: newDeptName,
      head: newDeptHead || 'Unassigned',
    };
    setDepartments([...departments, newDepartment]);
    setNewDeptName('');
    setNewDeptHead('');
    toast({
      title: 'Department Created',
      description: `The "${newDeptName}" department has been added.`,
    });
  };
  
  const handleEdit = (deptName: string) => {
    toast({
        title: "Action Triggered",
        description: `Editing for "${deptName}" would be enabled here.`
    })
  }

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
                      <Link
                        href={`/admin/departments/${dept.id}/teachers`}
                        className="text-primary hover:underline"
                      >
                        {dept.name}
                      </Link>
                    </TableCell>
                    <TableCell>{dept.head}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(dept.name)}>
                        Edit
                      </Button>
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
            <CardDescription>Add a new academic department.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dept-name">Department Name</Label>
              <Input
                id="dept-name"
                placeholder="e.g., Information Technology"
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dept-head">Department Head (Optional)</Label>
              <Input
                id="dept-head"
                placeholder="Select a teacher"
                value={newDeptHead}
                onChange={(e) => setNewDeptHead(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleAddDepartment}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

    