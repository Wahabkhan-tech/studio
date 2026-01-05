import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function StudentSessionsPage() {
    const upcomingSessions = [
        { id: 'ses1', title: 'Weekly Sync - Web Wizards', group: 'Web Wizards', date: '2024-07-26', status: 'SCHEDULED' },
        { id: 'ses2', title: 'Code Review', group: 'Web Wizards', date: '2024-08-02', status: 'SCHEDULED' },
    ];
    const pastSessions = [
        { id: 'ses3', title: 'Initial Kick-off', group: 'Web Wizards', date: '2024-07-19', status: 'COMPLETED' },
    ];

  return (
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
                             <Badge>{session.status}</Badge>
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
