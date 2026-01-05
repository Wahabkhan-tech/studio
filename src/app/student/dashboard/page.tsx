
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { groups } from '@/lib/data';
import { ArrowRight, BadgeInfo, Book, Package } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  // Assuming the logged in student is part of group g2 for demonstration.
  // In a real app, this would be based on the logged-in user's data.
  // We will toggle this to show both states of the dashboard.
  const myGroup = groups.find((g) => g.id === 'g2');

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <Alert className="bg-primary/10 border-primary/50">
        <BadgeInfo className="h-4 w-4" />
        <AlertTitle>Complete Your Profile!</AlertTitle>
        <AlertDescription className="flex justify-between items-center">
          <p>Make sure your profile is up-to-date with your latest skills and interests to get the best group suggestions.</p>
          <Button asChild variant="link" className="text-primary pr-0">
            <Link href="/student/profile">
              Go to Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2">
        {myGroup ? (
          <Link href={`/student/groups/${myGroup.id}`}>
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Group Status</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myGroup.name}</div>
              <p className="text-xs text-muted-foreground">
                {myGroup.projectTitle}
              </p>
               <div className="mt-4">
                <Progress value={myGroup.progress} className="w-full" />
               </div>
            </CardContent>
          </Card>
          </Link>
        ) : (
             <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Group Status</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">No Group Joined</div>
              <p className="text-xs text-muted-foreground">
                Create or join a group to get started.
              </p>
              <div className='flex gap-2 mt-4'>
                <Button asChild size="sm">
                    <Link href="/student/groups/create">Create Group</Link>
                </Button>
                 <Button asChild size="sm" variant="outline">
                    <Link href="/student/groups/join">Join Group</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proposal Status</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {myGroup ? (
              <>
                <div className="text-2xl font-bold">{myGroup.proposal.status.replace(/_/g, ' ')}</div>
                <p className="text-xs text-muted-foreground">
                  Your group's proposal is awaiting review.
                </p>
                 <Button asChild variant="outline" size="sm" className="mt-4">
                    <Link href={`/student/groups/${myGroup.id}?tab=proposal`}>
                        View Proposal
                    </Link>
                 </Button>
              </>
            ) : (
                <>
                    <div className="text-2xl font-bold">Not Submitted</div>
                     <p className="text-xs text-muted-foreground">
                        Join a group and submit your proposal.
                    </p>
                </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
