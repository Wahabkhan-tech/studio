'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { groups, teachers, sessions as initialSessions, students } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Session } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function SessionManagementPage() {
  const loggedInTeacherId = 'T01';
  const teacherGroups = groups.filter((g) => g.supervisorId === loggedInTeacherId);
  
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const { toast } = useToast();

  const handleScheduleSession = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const selectedGroupIds = teacherGroups.filter(g => formData.get(g.id)).map(g => g.id);

    if (!title || !date || selectedGroupIds.length === 0) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please fill all fields and select at least one group."
        })
        return;
    }

    const newSessions: Session[] = selectedGroupIds.map(groupId => ({
        id: `ses-${Date.now()}-${groupId}`,
        title,
        groupId,
        date,
        attendees: [],
    }));

    setSessions([...newSessions, ...sessions]);
    setIsScheduleDialogOpen(false);
    toast({
        title: "Session Scheduled!",
        description: `Scheduled "${title}" for ${selectedGroupIds.length} group(s).`
    })
  };

  const handleViewDetails = (session: Session) => {
    setSelectedSession(session);
    setIsDetailDialogOpen(true);
  };

  const upcomingSessions = sessions.filter(s => new Date(s.date) >= new Date() && teacherGroups.some(g => g.id === s.groupId));
  const pastSessions = sessions.filter(s => new Date(s.date) < new Date() && teacherGroups.some(g => g.id === s.groupId));
  
  const getAvatarUrl = (id: string) => {
    const student = students.find((s) => s.id === id);
    if (!student) return undefined;
    return PlaceHolderImages.find((p) => p.id === student.avatar)?.imageUrl;
  };
  
  const sessionGroup = selectedSession ? groups.find(g => g.id === selectedSession.groupId) : null;
  const sessionMembers = sessionGroup ? students.filter(s => sessionGroup.memberIds.includes(s.id)) : [];


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Session Management</h1>
          <p className="text-muted-foreground">
            Schedule, and review academic sessions with your groups.
          </p>
        </div>
        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Schedule Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule New Session</DialogTitle>
              <DialogDescription>
                Schedule a new session for one or more groups.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleScheduleSession}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Session Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Weekly Progress Sync"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label>Select Groups</Label>
                  <div className="space-y-2 rounded-md border p-4 max-h-48 overflow-y-auto">
                    {teacherGroups.map((group) => (
                      <div key={group.id} className="flex items-center space-x-2">
                        <Checkbox id={group.id} name={group.id} />
                        <Label htmlFor={group.id} className="font-normal">
                          {group.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Schedule Session</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{session.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        For: {groups.find(g => g.id === session.groupId)?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Date: {new Date(session.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(session)}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No upcoming sessions.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Past Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {pastSessions.length > 0 ? (
            <div className="space-y-4">
              {pastSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{session.title}</h3>
                       <p className="text-sm text-muted-foreground">
                        For: {groups.find(g => g.id === session.groupId)?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Date: {new Date(session.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Badge variant="secondary">COMPLETED</Badge>
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(session)}>
                        View Summary
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No past sessions recorded.
            </p>
          )}
        </CardContent>
      </Card>

      {selectedSession && sessionGroup && (
         <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Session: {selectedSession.title}</DialogTitle>
                    <DialogDescription>
                        For group "{sessionGroup.name}" on {new Date(selectedSession.date).toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <h4 className="font-semibold mb-2">Attendance</h4>
                    <div className="space-y-2">
                        {sessionMembers.map(member => (
                            <div key={member.id} className="flex justify-between items-center p-2 border rounded-md">
                                <div className="flex items-center gap-2">
                                     <Avatar className='h-8 w-8'>
                                        <AvatarImage src={getAvatarUrl(member.id)} />
                                        <AvatarFallback>
                                            {member.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>{member.name}</span>
                                </div>
                                <Badge variant={selectedSession.attendees.includes(member.id) ? 'default' : 'destructive'}>
                                    {selectedSession.attendees.includes(member.id) ? 'Present' : 'Absent'}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="py-4">
                    <h4 className="font-semibold mb-2">Session Summary/Notes</h4>
                    <p className='text-sm text-muted-foreground p-3 bg-muted/50 rounded-md border'>
                        This is where a summary of the session would appear. For this demo, no notes have been recorded.
                    </p>
                </div>
            </DialogContent>
         </Dialog>
      )}
    </div>
  );
}
