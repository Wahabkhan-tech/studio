
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Group, Student, Teacher, UserRole } from '@/lib/types';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Check, FileText, Send, PlusCircle, X, Pencil } from 'lucide-react';
import Link from 'next/link';
import {
  tasks as allTasks,
  students as allStudents,
  sessions,
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
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

interface GroupDetailsPageProps {
  role: UserRole;
  group: Group;
  supervisor?: Teacher;
  members: Student[];
}

export function GroupDetailsPage({
  role,
  group,
  supervisor,
  members,
}: GroupDetailsPageProps) {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'overview';
  const groupTasks = allTasks.slice(0, 3); // Demo tasks
  const loggedInStudent = allStudents[0];
  const groupSessions = sessions.filter((s) => s.groupId === group.id);

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

      <Tabs defaultValue={defaultTab}>
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="w-full justify-start">
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
                          <AvatarImage src={avatar?.imageUrl} />
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
                          {(role === 'teacher' || role === 'admin') && (
                            <p className="text-sm text-muted-foreground">
                              Attendance: 95%
                            </p>
                          )}
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
                <Dialog>
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
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="task-title">Task Title</Label>
                        <Input
                          id="task-title"
                          placeholder="e.g., Implement user authentication"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="task-student">Assign To</Label>
                        <Select>
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
                        <Input id="task-due-date" type="date" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Task</Button>
                    </DialogFooter>
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
                                <Button size="sm">Submit</Button>
                              )}
                          </TableCell>
                        )}
                        {role === 'teacher' && (
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
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
              {role === 'teacher' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="feedback-comment">
                      This Week's Comments
                    </Label>
                    <Textarea
                      id="feedback-comment"
                      placeholder="Enter your feedback on the group's progress this week..."
                      rows={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="progress-slider">
                      Set Project Progress ({group.progress}%)
                    </Label>
                    <Slider
                      id="progress-slider"
                      defaultValue={[group.progress]}
                      max={100}
                      step={5}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button>Submit Evaluation</Button>
                  </div>
                </>
              ) : (
                <div>
                  <h4 className="font-semibold text-lg">Latest Feedback</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    From {supervisor?.name} on July 24, 2024
                  </p>
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <p>
                      Great progress on the initial model training. The
                      accuracy is promising. For next week, please focus on
                      preparing the dataset for the next phase and document the
                      model architecture clearly.
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
              {groupSessions.length > 0 ? (
                <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold w-[150px] sticky left-0 bg-background">Student</TableHead>
                          {groupSessions.map((session) => (
                            <TableHead key={session.id} className="text-center">
                              {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {members.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium sticky left-0 bg-background/95 backdrop-blur-sm">{member.name}</TableCell>
                            {groupSessions.map((session) => {
                              const isPresent = session.attendees.includes(member.id);
                              return (
                                <TableCell key={session.id} className="text-center">
                                  {role === 'teacher' ? (
                                    <div className="flex justify-center gap-1">
                                      <Button size="icon" variant={isPresent ? 'default' : 'outline'} className='h-7 w-7 rounded-full'>P</Button>
                                      <Button size="icon" variant={!isPresent ? 'destructive' : 'outline'} className='h-7 w-7 rounded-full'>A</Button>
                                    </div>
                                  ) : (
                                    <Badge variant={isPresent ? 'default' : 'destructive'}>
                                      {isPresent ? 'P' : 'A'}
                                    </Badge>
                                  )}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                   <ScrollBar orientation="horizontal" />
                </ScrollArea>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No sessions have been scheduled for this group yet.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

