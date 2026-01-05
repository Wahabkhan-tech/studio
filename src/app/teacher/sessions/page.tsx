import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users } from 'lucide-react';
import { groups } from '@/lib/data';
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
} from "@/components/ui/dialog"


export default function SessionManagementPage() {
    const teacherGroups = groups.filter(g => g.supervisorId === 't1');
    const upcomingSessions = [
        { id: 'ses1', title: 'Weekly Sync - AI Innovators', group: 'AI Innovators', date: '2024-07-25', status: 'SCHEDULED' },
        { id: 'ses2', title: 'Proposal Discussion - Web Wizards', group: 'Web Wizards', date: '2024-07-26', status: 'SCHEDULED' },
    ];
    const pastSessions = [
        { id: 'ses3', title: 'Initial Kick-off', group: 'AI Innovators', date: '2024-07-18', status: 'COMPLETED' },
    ]

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold">Session Management</h1>
                <p className="text-muted-foreground">Schedule, and review academic sessions with your groups.</p>
            </div>
            <Dialog>
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
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Session Title</Label>
                            <Input id="title" placeholder="e.g., Weekly Progress Sync" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label>Select Groups</Label>
                            <div className="space-y-2 rounded-md border p-4">
                                {teacherGroups.map(group => (
                                    <div key={group.id} className="flex items-center space-x-2">
                                        <Checkbox id={group.id} />
                                        <Label htmlFor={group.id} className="font-normal">{group.name}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                    <Button type="submit">Schedule Session</Button>
                    </DialogFooter>
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
                    {upcomingSessions.map(session => (
                    <Card key={session.id}>
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{session.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Date: {new Date(session.date).toLocaleDateString()}
                                </p>
                            </div>
                            <Button variant="outline" size="sm">
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground text-center py-8">No upcoming sessions.</p>
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
                                <Badge variant="secondary">{session.status}</Badge>
                                <Button variant="outline" size="sm">View Summary</Button>
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
  );
}
