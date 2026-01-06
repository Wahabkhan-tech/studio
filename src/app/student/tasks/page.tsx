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
import { tasks, students } from '@/lib/data';
import { useState } from 'react';

export default function StudentTasksPage() {
  const loggedInStudentId = students[0].id; // For demo purposes
  const [myTasks, setMyTasks] = useState(tasks.filter(t => t.assignedTo === loggedInStudentId));

  const handleStatusChange = (taskId: string, newStatus: 'In Progress' | 'Done') => {
    setMyTasks(currentTasks => currentTasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Tasks</CardTitle>
        <CardDescription>
          View and manage tasks assigned to you for your group project.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myTasks.map((task) => {
              const assignee = students.find(s => s.id === task.assignedTo);
              const isMyTask = task.assignedTo === loggedInStudentId;
              return (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{assignee?.name}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <Badge variant={
                    task.status === 'Done' ? 'default' : 
                    task.status === 'In Progress' ? 'secondary' : 'outline'
                  }>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {isMyTask && task.status !== 'Done' && (
                    <Button 
                      size="sm"
                      onClick={() => handleStatusChange(
                        task.id,
                        task.status === 'To Do' ? 'In Progress' : 'Done'
                      )}
                    >
                      {task.status === 'To Do' ? 'Start Task' : 'Submit for Review'}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

    