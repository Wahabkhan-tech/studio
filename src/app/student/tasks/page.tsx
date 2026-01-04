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

export default function StudentTasksPage() {
  const myTasks = tasks.filter(t => t.assignedTo === 's1' || t.assignedTo === 's5');
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
              const isMyTask = task.assignedTo === 's1';
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
                    <Button size="sm">
                      {task.status === 'To Do' ? 'Start' : 'Submit'}
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
