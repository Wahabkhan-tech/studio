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
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  students as initialStudents,
  departments,
  groups as allGroups,
} from '@/lib/data';
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
import type { Student, Group } from '@/lib/types';
import Link from 'next/link';
import { useActivity } from '@/context/ActivityContext';

export default function StudentManagementPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const currentYear = new Date().getFullYear().toString();
  const [selectedSession, setSelectedSession] = useState<string>(currentYear);
  const { addActivity } = useActivity();
  
  const filteredStudents = selectedSession === 'all' 
    ? students 
    : students.filter(s => s.session === selectedSession);

  const [groups, setGroups] = useState<Group[]>(allGroups);
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);
  const [isAddToGroupDialogOpen, setIsAddToGroupDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const { toast } = useToast();
  
  const handleSessionFilterChange = (session: string) => {
    setSelectedSession(session);
  };

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
      session: formData.get('session') as string,
    };

    setStudents([newStudent, ...students]);
    addActivity(`New student "${newStudent.name}" was added manually.`, 'student');
    setIsAddStudentDialogOpen(false);
    toast({
      title: 'Student Added',
      description: `${newStudent.name} has been added to the registry.`,
    });
  };
  
  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // This is a simulation. In a real app, you would parse the CSV.
    toast({
      title: 'File uploaded!',
      description: `Simulating import for "${file.name}". Adding 3 dummy students.`,
    });

    const dummyStudents: Student[] = [
      { id: 'CSV001', name: 'CSV Student One', email: 'csv1@example.com', registrationNumber: 'CSV001', semester: 1, status: 'INACTIVE', avatar: '', skills: [], interests: '', department: 'Computer Science', class: 'BSCS', section: 'C', session: currentYear },
      { id: 'CSV002', name: 'CSV Student Two', email: 'csv2@example.com', registrationNumber: 'CSV002', semester: 1, status: 'INACTIVE', avatar: '', skills: [], interests: '', department: 'Computer Science', class: 'BSCS', section: 'C', session: currentYear },
      { id: 'CSV003', name: 'CSV Student Three', email: 'csv3@example.com', registrationNumber: 'CSV003', semester: 1, status: 'INACTIVE', avatar: '', skills: [], interests: '', department: 'Computer Science', class: 'BSCS', section: 'C', session: currentYear },
    ];
    
    setStudents(prev => [...dummyStudents, ...prev]);
    addActivity(`3 new students were added via bulk import.`, 'student');
  };


  const handleStatusChange = (
    studentId: string,
    newStatus: Student['status']
  ) => {
    setStudents(prev => prev.map((s) =>
        s.id === studentId ? { ...s, status: newStatus } : s
      ));
    toast({
      title: 'Status Updated',
      description: `Student status has been changed to ${newStatus}.`,
    });
  };

  const handleOpenAddToGroupDialog = (student: Student) => {
    setSelectedStudent(student);
    setIsAddToGroupDialogOpen(true);
  };
  
  const handleAssignGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedStudent) return;
    
    const formData = new FormData(e.currentTarget);
    const groupId = formData.get('group') as string;

    // Remove student from any previous group
    const updatedGroups = groups.map(g => ({
        ...g,
        memberIds: g.memberIds.filter(id => id !== selectedStudent.id)
    }));

    // Add student to the new group
    const finalGroups = updatedGroups.map(g => {
        if (g.id === groupId && !g.memberIds.includes(selectedStudent.id)) {
            return {
                ...g,
                memberIds: [...g.memberIds, selectedStudent.id]
            }
        }
        return g;
    });

    setGroups(finalGroups);

    toast({
        title: "Student Assigned",
        description: `${selectedStudent.name} has been added to group "${finalGroups.find(g => g.id === groupId)?.name}".`
    });

    setIsAddToGroupDialogOpen(false);
    setSelectedStudent(null);
  };


  return (
    <div className="grid gap-6 md:grid-cols-5">
      <div className="md:col-span-3">
        <Card>
          <CardHeader>
             <div className='flex justify-between items-center'>
              <div>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>
                  View and manage all student accounts in the system.
                </CardDescription>
              </div>
              <div className="w-48">
                <Select onValueChange={handleSessionFilterChange} defaultValue={currentYear}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by session" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Sessions</SelectItem>
                        <SelectItem value="2024">2024 Session</SelectItem>
                        <SelectItem value="2023">2023 Session</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Avatar</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => {
                  const avatar = PlaceHolderImages.find(
                    (img) => img.id === student.avatar
                  );
                  const group = groups.find(g => g.memberIds.includes(student.id));

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
                        <Link href={`/student/profile/${student.id}`} className="hover:underline text-primary">
                          {student.name}
                        </Link>
                        <div className="text-sm text-muted-foreground">
                          {student.email}
                        </div>
                      </TableCell>
                       <TableCell>
                        {group ? (
                          <Link href={`/admin/groups/${group.id}`}>
                            <Badge variant="secondary">{group.name}</Badge>
                          </Link>
                        ) : (
                          <Badge variant="outline">Unassigned</Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant={
                            student.status === 'ACTIVE'
                              ? 'default'
                              : student.status === 'INACTIVE'
                              ? 'secondary'
                              : 'destructive'
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
                             <DropdownMenuItem asChild>
                                <Link href={`/student/profile/${student.id}`}>View Profile</Link>
                             </DropdownMenuItem>
                            {student.status === 'INACTIVE' && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(student.id, 'ACTIVE')
                                }
                              >
                                Approve
                              </DropdownMenuItem>
                            )}
                            {student.status === 'ACTIVE' && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(student.id, 'INACTIVE')
                                }
                              >
                                Deactivate
                              </DropdownMenuItem>
                            )}
                             <DropdownMenuItem onClick={() => handleOpenAddToGroupDialog(student)}>Add to Group</DropdownMenuItem>
                            <DropdownMenuSeparator />
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
              Showing <strong>1-{filteredStudents.length}</strong> of{' '}
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
            <Dialog
              open={isAddStudentDialogOpen}
              onOpenChange={setIsAddStudentDialogOpen}
            >
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
                      <Input
                        id="name"
                        name="name"
                        placeholder="e.g., John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-no">Registration / Seat Number</Label>
                      <Input
                        id="reg-no"
                        name="reg-no"
                        placeholder="e.g., EB12345"
                        required
                      />
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
                              <SelectItem key={dept.id} value={dept.id}>
                                {dept.name}
                              </SelectItem>
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
                        <Input id="session" name="session" defaultValue={currentYear} />
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
              <Input id="csv-file" type="file" accept=".csv" onChange={handleBulkUpload}/>
            </div>
            <p className="text-xs text-muted-foreground">
              Ensure your CSV has columns: <br /> `name`, `seat_number`,
              `email`, `department`, `class`, `section`, `session`.
            </p>
            <Button
              className="w-full"
              onClick={() => document.getElementById('csv-file')?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload and Process File
            </Button>
          </CardContent>
        </Card>
      </div>

       <Dialog open={isAddToGroupDialogOpen} onOpenChange={setIsAddToGroupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add "{selectedStudent?.name}" to a Group</DialogTitle>
            <DialogDescription>
              Select a group to assign this student to. This will remove them from their current group if they are in one.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAssignGroup}>
            <div className="py-4">
              <Label htmlFor="group">Group</Label>
              <Select name="group" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map(g => (
                    <SelectItem key={g.id} value={g.id}>{g.name} - {g.projectTitle}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit">Assign to Group</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
