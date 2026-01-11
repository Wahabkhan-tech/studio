'use client';
import { useState } from 'react';
import { MoreHorizontal, PlusCircle, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { students as initialStudents, departments } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { Student } from '@/lib/types';

export default function StudentManagementPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newStudent: Student = {
      id: formData.get('reg-no') as string,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      registrationNumber: formData.get('reg-no') as string,
      semester: Number(formData.get('semester')),
      status: 'INACTIVE',
      avatar: `default-${Date.now()}`,
      skills: [],
      interests: '',
      department: 'Computer Science',
      class: 'BSCS',
      section: 'A',
      session: '2024',
    };

    setStudents([newStudent, ...students]);
    setIsDialogOpen(false);
    toast({
      title: 'Student Added',
      description: `${newStudent.name} has been added to the registry.`,
    });
  };
  
    const handleStatusChange = (studentId: string, newStatus: Student['status']) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, status: newStatus } : s));
    toast({
      title: 'Status Updated',
      description: `Student status has been changed to ${newStatus}.`,
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-5">
      <div className="md:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Student Management</CardTitle>
            <CardDescription>
              View and manage all student accounts in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Avatar</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => {
                  const avatar = PlaceHolderImages.find(
                    (img) => img.id === student.avatar
                  );
                  return (
                    <TableRow key={student.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Avatar className="h-10 w-10">
                          {avatar && (
                            <AvatarImage
                              src={avatar.imageUrl}
                              alt={student.name}
                              data-ai-hint={avatar.imageHint}
                            />
                          )}
                          <AvatarFallback>
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div>{student.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {student.email}
                        </div>
                      </TableCell>
                      <TableCell>{student.semester}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant={
                            student.status === 'ACTIVE'
                              ? 'default'
                              : student.status === 'INACTIVE' ? 'secondary' : 'destructive'
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            {student.status === 'INACTIVE' && (
                              <DropdownMenuItem onClick={() => handleStatusChange(student.id, 'ACTIVE')}>
                                Approve
                              </DropdownMenuItem>
                            )}
                             {student.status === 'ACTIVE' && (
                              <DropdownMenuItem onClick={() => handleStatusChange(student.id, 'INACTIVE')}>
                                Deactivate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{students.length}</strong> of{' '}
              <strong>{students.length}</strong> students
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Student</CardTitle>
            <CardDescription>
              Manually add a single student to the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Student Manually
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new student.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddStudent}>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" placeholder="e.g., John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-no">Registration / Seat Number</Label>
                      <Input id="reg-no" name="reg-no" placeholder="e.g., EB12345" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="e.g., john.doe@example.com"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select name="department" defaultValue="cs">
                                <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                {departments.map((dept) => (
                                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="class">Class/Program</Label>
                            <Input id="class" name="class" defaultValue="BSCS" />
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="section">Section</Label>
                            <Input id="section" name="section" defaultValue="A" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="session">Session</Label>
                            <Input id="session" name="session" defaultValue="2024" />
                        </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Select name="semester" defaultValue="8">
                        <SelectTrigger id="semester">
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(8)].map((_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Student</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bulk Import Students</CardTitle>
            <CardDescription>
              Upload a CSV file to add multiple students at once.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csv-file">Upload CSV File</Label>
              <Input id="csv-file" type="file" accept=".csv" />
            </div>
            <p className="text-xs text-muted-foreground">
              Ensure your CSV has columns: <br /> `name`, `seat_number`,
              `email`, `department`, `class`, `section`, `session`.
            </p>
            <Button className="w-full" onClick={() => toast({ title: "File uploaded!", description: "Processing is simulated and won't add students."})}>
              <Upload className="mr-2 h-4 w-4" />
              Upload and Process File
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
