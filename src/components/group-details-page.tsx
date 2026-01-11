
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Group, Student, Teacher, UserRole, Task } from '@/lib/types';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Check, FileText, Send, PlusCircle, X } from 'lucide-react';
import Link from 'next/link';
import {
  tasks as allTasks,
  students as allStudents,
  sessions as allSessions,
} from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { useSearchParams } from 'next/navigation';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Slider } from './ui/slider';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { AttendanceTracker } from './attendance-tracker';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface GroupDetailsPageProps {
  role: UserRole;
  group: Group;
  supervisor?: Teacher;
  members: Student[];
}

export function GroupDetailsPage({
  role,
  group: initialGroup,
  supervisor,
  members,
}: GroupDetailsPageProps) {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'overview';
  
  const [group, setGroup] = useState<Group>(initialGroup);
  const [groupTasks, setGroupTasks] = useState<Task[]>(allTasks.filter(t => group.memberIds.includes(t.assignedTo)));
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [feedbackComment, setFeedbackComment] = useState('Great progress on the initial model training. The accuracy is promising. For next week, please focus on preparing the dataset for the next phase and document the model architecture clearly.');
  const [progressValue, setProgressValue] = useState(group.progress);

  const { toast } = useToast();

  const loggedInStudent = allStudents[0];
  const groupSessions = allSessions.filter((s) => s.groupId === group.id);

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTask: Task = {
        id: `task-${Date.now()}`,
        title: formData.get('task-title') as string,
        assignedTo: formData.get('task-student') as string,
        dueDate: formData.get('task-due-date') as string,
        status: 'To Do',
    }

    setGroupTasks([newTask, ...groupTasks]);
    setIsTaskDialogOpen(false);
    toast({
        title: "Task Created!",
        description: `Assigned "${newTask.title}" to ${members.find(s=> s.id === newTask.assignedTo)?.name}.`
    })
  };

  const handleTaskStatusChange = (taskId: string, status: Task['status']) => {
    setGroupTasks(groupTasks.map(t => t.id === taskId ? {...t, status} : t));
    toast({
        title: 'Task Submitted',
        description: 'Your supervisor has been notified for review.'
    })
  };

  const handleReviewClick = (task: Task) => {
    setSelectedTask(task);
    setIsReviewDialogOpen(true);
  }

  const handleSubmitEvaluation = () => {
    setGroup(prevGroup => ({...prevGroup, progress: progressValue}));
    toast({
        title: "Evaluation Submitted",
        description: `Progress for ${group.name} has been updated to ${progressValue}%.`
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{group.name}</CardTitle>
              <CardDescription className="text-lg">
                {group.projectTitle}
              </CardDescription>
            </div>
            <Badge variant="default" className="text-base">
              {group.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Project Progress
            </span>
            <Progress value={group.progress} className="w-full" />
            <span className="font-bold">{group.progress}%</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue={defaultTab} className="w-full">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="flex w-max">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="proposal">Proposal</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{group.description}</p>
              <div>
                <h4 className="font-semibold mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {group.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Group Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {supervisor && (
                <div>
                  <h4 className="font-semibold mb-2">Supervisor</h4>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={
                          PlaceHolderImages.find(
                            (p) => p.id === supervisor.avatar
                          )?.imageUrl
                        }
                      />
                      <AvatarFallback>
                        {supervisor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{supervisor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {supervisor.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <h4 className="font-semibold mb-2">Students</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {members.map((member) => {
                    const avatar = PlaceHolderImages.find(
                      (p) => p.id === member.avatar
                    );
                    return (
                      <div
                        key={member.id}
                        className="flex items-center gap-4 p-2 rounded-lg"
                      >
                        <Avatar className="h-12 w-12">
                          {avatar && <AvatarImage src={avatar.imageUrl} />}
                          <AvatarFallback>
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {member.name}{' '}
                            {group.leaderId === member.id && (
                              <Badge variant="outline">Leader</Badge>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposal">
          <Card>
            <CardHeader>
              <CardTitle>Project Proposal</CardTitle>
              <CardDescription>
                Status:{' '}
                <Badge
                  variant={
                    group.proposal.status === 'APPROVED'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {group.proposal.status.replace(/_/g, ' ')}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {group.proposal.description}
              </p>
              <Button variant="outline" asChild>
                <Link href="#">
                  <FileText className="mr-2 h-4 w-4" /> View Full Proposal.pdf
                </Link>
              </Button>
              {(role === 'teacher' || role === 'admin') && (
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Your Feedback</h4>
                  <Textarea
                    placeholder="Provide feedback..."
                    defaultValue={group.proposal.feedback}
                  />
                  <div className="flex gap-2 mt-2 justify-end">
                    <Button variant="outline">
                      <Send className="mr-2 h-4 w-4" />
                      Request Changes
                    </Button>
                    <Button variant="destructive">
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button>
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Task Management</CardTitle>
              {(role === 'teacher' ||
                (role === 'student' && group.leaderId === loggedInStudent.id)) && (
                <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add New Task
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Task</DialogTitle>
                      <DialogDescription>
                        Assign a new task to a group member.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateTask}>
                        <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="task-title">Task Title</Label>
                            <Input
                            id="task-title"
                            name="task-title"
                            placeholder="e.g., Implement user authentication"
                            required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="task-student">Assign To</Label>
                            <Select name="task-student" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a student" />
                            </SelectTrigger>
                            <SelectContent>
                                {members.map((s) => (
                                <SelectItem key={s.id} value={s.id}>
                                    {s.name}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="task-due-date">Due Date</Label>
                            <Input id="task-due-date" name="task-due-date" type="date" required/>
                        </div>
                        </div>
                        <DialogFooter>
                        <Button type="submit">Add Task</Button>
                        </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Status</TableHead>
                    {role !== 'admin' && (
                      <TableHead className="text-right">Action</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupTasks.map((task) => {
                    const assignee = members.find(
                      (m) => m.id === task.assignedTo
                    );
                    return (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">
                          {task.title}
                        </TableCell>
                        <TableCell>{assignee?.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              task.status === 'Done'
                                ? 'default'
                                : task.status === 'In Progress'
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {task.status}
                          </Badge>
                        </TableCell>
                        {role === 'student' && (
                          <TableCell className="text-right">
                            {task.assignedTo === loggedInStudent.id &&
                              task.status !== 'Done' && (
                                <Button size="sm" onClick={() => handleTaskStatusChange(task.id, 'Done')}>Submit</Button>
                              )}
                          </TableCell>
                        )}
                        {role === 'teacher' && (
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline" onClick={() => handleReviewClick(task)}>
                              View
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                   {groupTasks.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center h-24">
                                No tasks created for this group yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluation">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Evaluation</CardTitle>
              <CardDescription>
                {role === 'teacher'
                  ? "Provide weekly feedback and update the project's progress."
                  : 'View the latest feedback from your supervisor.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {role === 'teacher' || role === 'admin' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="feedback-comment">
                      This Week's Comments
                    </Label>
                    <Textarea
                      id="feedback-comment"
                      placeholder="Enter your feedback on the group's progress this week..."
                      rows={5}
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="progress-slider">
                      Set Project Progress ({progressValue}%)
                    </Label>
                    <Slider
                      id="progress-slider"
                      defaultValue={[progressValue]}
                      max={100}
                      step={5}
                      onValueChange={(value) => setProgressValue(value[0])}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSubmitEvaluation}>Submit Evaluation</Button>
                  </div>
                </>
              ) : (
                <div>
                  <h4 className="font-semibold text-lg">Latest Feedback</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    From {supervisor?.name} on {new Date().toLocaleDateString()}
                  </p>
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <p>
                      {feedbackComment}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Scoreboard</CardTitle>
              <CardDescription>
                Track attendance for all scheduled sessions.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <AttendanceTracker
                  role={role}
                  group={group}
                  members={members}
                  sessions={groupSessions}
                />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogContent>
            <DialogHeader>
                <DialogTitle>Review Task: {selectedTask?.title}</DialogTitle>
                <DialogDescription>
                    Submitted by {members.find(m => m.id === selectedTask?.assignedTo)?.name}
                </DialogDescription>
            </DialogHeader>
            <div className='py-4 space-y-4'>
                <p className='text-sm text-muted-foreground'>This is a placeholder for the submitted file or content. In a real application, you would see the student's work here.</p>
                <div className='p-4 border rounded-md bg-muted/50 h-32'>
                    <FileText className='mx-auto text-muted-foreground'/>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>Request Revisions</Button>
                <Button onClick={() => {
                    toast({title: "Task Approved!", description: `The submission for "${selectedTask?.title}" has been marked as complete.`});
                    setIsReviewDialogOpen(false);
                }}>
                    Approve & Close Task
                </Button>
            </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  );

    