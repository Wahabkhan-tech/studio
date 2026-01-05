
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
import { ArrowRight, BadgeInfo, Book, Package, ShieldCheck, Hourglass, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  // Assuming the logged in student is part of group g2 for demonstration.
  // In a real app, this would be based on the logged-in user's data.
  const myGroup = groups.find((g) => g.id === 'g2');

  const renderGroupStatus = () => {
    if (!myGroup) {
      return (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Step 1: Join a Group</CardTitle>
            <CardDescription>
              You are not part of any group yet. Create a new group or join an
              existing one to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/student/groups/create">Create Group</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/student/groups/join">Join a Group</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (myGroup.proposal.status === 'PENDING' || myGroup.proposal.status === 'CHANGES_REQUESTED') {
      return (
        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardHeader className="pb-4">
             <div className='flex items-center gap-2'>
                <Hourglass className="h-6 w-6 text-yellow-600" />
                <CardTitle>Step 2: Proposal Pending Approval</CardTitle>
            </div>
            <CardDescription>
              Your group, "{myGroup.name}", has submitted a proposal that is awaiting teacher approval. Your profile and full access will be unlocked once it's approved.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
                <Link href={`/student/groups/${myGroup.id}?tab=proposal`}>View Proposal Status</Link>
            </Button>
          </CardContent>
        </Card>
      )
    }

     if (myGroup.proposal.status === 'REJECTED') {
      return (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader className="pb-4">
             <div className='flex items-center gap-2'>
                <XCircle className="h-6 w-6 text-destructive" />
                <CardTitle>Action Required: Proposal Rejected</CardTitle>
            </div>
            <CardDescription>
             Your group's proposal for "{myGroup.proposal.title}" was rejected. Please review the feedback and submit a revised version.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="destructive">
                <Link href={`/student/groups/${myGroup.id}?tab=proposal`}>View Feedback & Resubmit</Link>
            </Button>
          </CardContent>
        </Card>
      )
    }

    if (myGroup.proposal.status === 'APPROVED') {
       return (
        <Card className="border-green-500/50 bg-green-500/5">
          <CardHeader className="pb-4">
             <div className='flex items-center gap-2'>
                <ShieldCheck className="h-6 w-6 text-green-600" />
                <CardTitle>Profile Complete & Approved!</CardTitle>
            </div>
            <CardDescription>
              Congratulations! Your group "{myGroup.name}" is approved. You now have full access to all project management features.
            </CardDescription>
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
      )
    }
  };


  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      {(!myGroup || myGroup.proposal.status !== 'APPROVED') && (
        <Alert>
            <BadgeInfo className="h-4 w-4" />
            <AlertTitle>Complete Your Profile to Unlock Features</AlertTitle>
            <AlertDescription className="flex justify-between items-center">
            <div>
              <p>Your profile is the key to collaboration. Make sure your skills and interests are up-to-date.</p>
              <p className="text-xs text-muted-foreground mt-1">Full access to tasks, attendance, and sessions is granted after your group proposal is approved.</p>
            </div>
            <Button asChild variant="outline" size="sm" className="ml-4 flex-shrink-0">
                <Link href="/student/profile">
                Update Profile
                </Link>
            </Button>
            </AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-4 md:grid-cols-2">
        {renderGroupStatus()}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Group</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {myGroup ? (
              <>
                <div className="text-2xl font-bold">{myGroup.name}</div>
                <p className="text-xs text-muted-foreground">
                  {myGroup.projectTitle}
                </p>
                 <Button asChild variant="outline" size="sm" className="mt-4">
                    <Link href={`/student/groups/${myGroup.id}`}>
                        View Group Details
                    </Link>
                 </Button>
              </>
            ) : (
                <>
                    <div className="text-2xl font-bold">Not in a group</div>
                     <p className="text-xs text-muted-foreground">
                        Join or create a group to see details here.
                    </p>
                </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
