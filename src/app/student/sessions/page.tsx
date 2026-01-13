'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { students, groups, sessions as allSessions, teachers } from '@/lib/data';
import { useState } from 'react';
import type { Session } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function StudentSessionsPage() {
    const loggedInStudent = students.find((s) => s.id === 'EB22210006139')!;
    const myGroup = groups.find((g) => g.memberIds.includes(loggedInStudent.id))!;
    const mySessions = allSessions.filter(s => s.groupId === myGroup.id);
    const supervisor = teachers.find(t => t.id === myGroup.supervisorId);

    const [selectedSession, setSelectedSession] = useState<Session | null>(null);

    const upcomingSessions = mySessions.filter(s => new Date(s.date) >= new Date());
    const pastSessions = mySessions.filter(s => new Date(s.date) < new Date());
    
    const sessionMembers = students.filter(s => myGroup.memberIds.includes(s.id));
    const getAvatarUrl = (id: string) => {
        const student = students.find((s) => s.id === id);
        if (!student) return undefined;
        return PlaceHolderImages.find((p) => p.id === student.avatar)?.imageUrl;
    };


  return (
    <>
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold">My Sessions</h1>
            <p className="text-muted-foreground">View your upcoming and past sessions with your supervisor.</p>
        </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
            {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                    {upcomingSessions.map(session => (
                    <Card key={session.id}>
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{session.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Date: {new Date(session.date).toLocaleDateString()}
                                </p>
                            </div>
                             <Badge>SCHEDULED</Badge>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground text-center py-8">No upcoming sessions scheduled.</p>
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
                    {pastSessions.map(session => (
                    <Card key={session.id}>
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{session.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Date: {new Date(session.date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <Badge variant="secondary">COMPLETED</Badge>
                                <Button variant="outline" size="sm" onClick={() => setSelectedSession(session)}>View Summary</Button>
                            </div>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            ): (
                 <p className="text-muted-foreground text-center py-8">No past sessions recorded.</p>
            )}
        </CardContent>
      </Card>
    </div>
    
     {selectedSession && (
         <Dialog open={!!selectedSession} onOpenChange={(isOpen) => !isOpen && setSelectedSession(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Session Summary: {selectedSession.title}</DialogTitle>
                    <DialogDescription>
                        With {supervisor?.name} on {new Date(selectedSession.date).toLocaleDateString()}
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
                    <h4 className="font-semibold mb-2">Session Notes</h4>
                    <p className='text-sm text-muted-foreground p-3 bg-muted/50 rounded-md border'>
                        No notes were recorded for this session.
                    </p>
                </div>
            </DialogContent>
         </Dialog>
      )}
    </>
  );
}
