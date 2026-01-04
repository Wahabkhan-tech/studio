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

export default function TeacherTasksPage() {
    const teacherGroups = groups.filter(g => g.supervisorId === 't1');
    // For demo, showing tasks from all supervised groups
    const supervisedStudentIds = teacherGroups.flatMap(g => g.memberIds);
    const supervisedTasks = tasks.filter(t => supervisedStudentIds.includes(t.assignedTo));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks Review</CardTitle>
        <CardDescription>
          Review task progress for your supervised groups.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
            <Select defaultValue={teacherGroups[0].id}>
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
