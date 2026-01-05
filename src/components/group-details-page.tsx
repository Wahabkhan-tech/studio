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
import { Check, FileText, Send, UserCheck, UserX, X } from 'lucide-react';
import Link from 'next/link';
import { tasks as allTasks } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Switch } from './ui/switch';
import { useSearchParams } from 'next/navigation';

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
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="proposal">Proposal</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
        </TabsList>

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
                      <AvatarImage src={PlaceHolderImages.find(p=>p.id === supervisor.avatar)?.imageUrl} />
                      <AvatarFallback>{supervisor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{supervisor.name}</p>
                      <p className="text-sm text-muted-foreground">{supervisor.email}</p>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <h4 className="font-semibold mb-2">Students</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                {members.map(member => {
                  const avatar = PlaceHolderImages.find(p => p.id === member.avatar);
                  return (
                    <div key={member.id} className="flex items-center gap-4 p-2 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={avatar?.imageUrl} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                       <div>
                        <p className="font-medium">{member.name} {group.leaderId === member.id && <Badge variant="outline">Leader</Badge>}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        {(role === 'teacher' || role === 'admin') && <p className="text-sm text-muted-foreground">Attendance: 95%</p>}
                      </div>
                    </div>
                  )
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
                <CardDescription>Status: <Badge variant={group.proposal.status === 'APPROVED' ? 'default' : 'secondary'}>{group.proposal.status.replace(/_/g, ' ')}</Badge></CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
                <p className="text-muted-foreground">{group.proposal.description}</p>
                <Button variant="outline" asChild>
                    <Link href="#"><FileText className="mr-2 h-4 w-4" /> View Full Proposal.pdf</Link>
                </Button>
                {(role === 'teacher' || role === 'admin') && (
                  <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-2">Your Feedback</h4>
                      <Textarea placeholder="Provide feedback..." defaultValue={group.proposal.feedback}/>
                      <div className="flex gap-2 mt-2 justify-end">
                        <Button variant="outline"><Send className="mr-2 h-4 w-4" />Request Changes</Button>
                        <Button variant="destructive"><X className="mr-2 h-4 w-4" />Reject</Button>
                        <Button><Check className="mr-2 h-4 w-4" />Approve</Button>
                      </div>
                  </div>
                )}
             </CardContent>
           </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
            <Card>
                <CardHeader>
                    <CardTitle>Task Management</CardTitle>
                    {role === 'student' && group.leaderId === 's1' && <Button>Add New Task</Button>}
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Task</TableHead>
                                <TableHead>Assigned To</TableHead>
                                <TableHead>Status</TableHead>
                                {role === 'student' && <TableHead className="text-right">Action</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {groupTasks.map(task => {
                                const assignee = members.find(m => m.id === task.assignedTo);
                                return (
                                <TableRow key={task.id}>
                                    <TableCell className="font-medium">{task.title}</TableCell>
                                    <TableCell>{assignee?.name}</TableCell>
                                    <TableCell><Badge variant="secondary">{task.status}</Badge></TableCell>
                                    {role === 'student' && (
                                        <TableCell className="text-right">
                                            {task.assignedTo === 's1' && task.status !== 'Done' && <Button size="sm">Submit</Button>}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="attendance">
            <Card>
                <CardHeader><CardTitle>Attendance</CardTitle></CardHeader>
                <CardContent>
                    {(role === 'teacher' || role === 'admin') && (
                        <Table>
                           <TableHeader><TableRow><TableHead>Student</TableHead><TableHead className="text-right">Mark Attendance</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {members.map(member => (
                                    <TableRow key={member.id}>
                                        <TableCell>{member.name}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <UserX className="text-muted-foreground" size={16} />
                                                <Switch defaultChecked disabled={role === 'admin'} />
                                                <UserCheck className="text-primary" size={16} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                     {role === 'student' && (
                        <div>
                            <p className="text-muted-foreground mb-4">Your attendance record for this project.</p>
                            <div className="flex items-center gap-4">
                                <span className="text-lg font-bold">95%</span>
                                <Progress value={95} className="w-full" />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="chat">
            <Card>
                <CardHeader><CardTitle>Group Chat & Logs</CardTitle></CardHeader>
                <CardContent className="text-center text-muted-foreground py-12">
                  <p>Chat functionality coming soon.</p>
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="evaluation">
             <Card>
                <CardHeader><CardTitle>Evaluation</CardTitle></CardHeader>
                <CardContent className="text-center text-muted-foreground py-12">
                    {(role === 'teacher' || role === 'admin') && <p>Evaluation entry form coming soon.</p>}
                    {role === 'student' && <p>Final results will be displayed here after evaluation.</p>}
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
