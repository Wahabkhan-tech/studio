
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { groups, students } from '@/lib/data';
import { Book, Package, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function StudentDashboard() {
  // Assuming the logged in student is the first one in the list for demonstration.
  const loggedInStudent = students.find(s => s.id === 'EB22210006139');
  if (!loggedInStudent) {
    redirect('/login/student');
  }

  const myGroup = groups.find((g) => g.memberIds.includes(loggedInStudent.id));
  
  if (!myGroup || myGroup.proposal.status !== 'APPROVED') {
    redirect('/student/onboarding');
  }
  
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
        <Card className="border-green-500/50 bg-green-500/5">
          <CardHeader className="pb-4">
             <div className='flex items-center gap-2'>
                <ShieldCheck className="h-6 w-6 text-green-600" />
                <CardTitle>Welcome to Your Dashboard</CardTitle>
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
      
      <div className="grid gap-4 md:grid-cols-2">
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
        
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Task</CardTitle>
                <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Develop authentication API</div>
                <p className="text-xs text-muted-foreground">
                    Due on June 20, 2024
                </p>
                 <Button asChild variant="outline" size="sm" className="mt-4">
                    <Link href="/student/tasks">
                        View All Tasks
                    </Link>
                 </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
