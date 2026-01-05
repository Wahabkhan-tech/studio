'use client';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { tasks, students, groups } from '@/lib/data';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';

export default function TeacherTasksPage() {
    const teacherGroups = groups.filter(g => g.supervisorId === 't1');
    // For demo, showing tasks from all supervised groups
    const supervisedStudentIds = teacherGroups.flatMap(g => g.memberIds);
    const supervisedTasks = tasks.filter(t => supervisedStudentIds.includes(t.assignedTo));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Tasks Review</CardTitle>
            <CardDescription>
            Review task progress and create new tasks for your supervised groups.
            </CardDescription>
        </div>
         <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Create Task
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                        Assign a new task to a student in one of your groups.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="task-title">Task Title</Label>
                        <Input id="task-title" placeholder="e.g., Implement login page UI" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="task-group">Group</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a group" />
                            </SelectTrigger>
                            <SelectContent>
                                {teacherGroups.map(g => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="task-student">Assign To</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a student" />
                            </SelectTrigger>
                            <SelectContent>
                                {students.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="task-due-date">Due Date</Label>
                        <Input id="task-due-date" type="date" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Create Task</Button>
                </DialogFooter>
            </DialogContent>
         </Dialog>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
            <Select defaultValue="all">
                <SelectTrigger className='w-full md:w-1/3'>
                    <SelectValue placeholder="Filter by group" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Groups</SelectItem>
                    {teacherGroups.map(group => (
                        <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supervisedTasks.map((task) => {
              const assignee = students.find(s => s.id === task.assignedTo);
              const group = groups.find(g => g.memberIds.includes(task.assignedTo));
              return (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{group?.name}</TableCell>
                <TableCell>{assignee?.name}</TableCell>
                <TableCell>
                   <Badge variant={
                    task.status === 'Done' ? 'default' : 
                    task.status === 'In Progress' ? 'secondary' : 'outline'
                  }>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View Submission
                    </Button>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
