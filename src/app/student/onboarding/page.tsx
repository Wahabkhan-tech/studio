
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Book,
  Check,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Users,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { groups as initialGroups, students, teachers } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { Group } from '@/lib/types';

const steps = [
  { id: 'Step 1', name: 'Select Group', icon: <Users className="h-5 w-5" /> },
  { id: 'Step 2', name: 'Submit Proposal', icon: <Book className="h-5 w-5" /> },
  { id: 'Step 3', name: 'Approval', icon: <Check className="h-5 w-5" /> },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [myGroup, setMyGroup] = useState<Group | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  // In a real app, this would be the logged in user from context/session
  const loggedInStudent = students[0];

  useEffect(() => {
    const studentGroup = groups.find(g => g.memberIds.includes(loggedInStudent.id));
    if (studentGroup) {
      setMyGroup(studentGroup);
      if (studentGroup.proposal.status === 'PENDING' || studentGroup.proposal.status === 'CHANGES_REQUESTED') {
        setCurrentStep(2);
      } else if (studentGroup.proposal.status === 'NONE') {
        setCurrentStep(1);
      }
    }
  }, [groups, loggedInStudent.id]);


  const goToNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const goToPreviousStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleRequestJoin = (groupId: string) => {
    toast({
        title: "Request Sent!",
        description: `Your request to join group "${groups.find(g => g.id === groupId)?.name}" has been sent.`,
    });
    // In a real app, this would be a request. For demo, we just show toast.
  }
  
  const handleGroupCreation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const groupName = formData.get('group-name') as string;
    
    if (!groupName) {
        toast({ variant: 'destructive', title: 'Error', description: 'Group name is required.' });
        return;
    }

    const newGroup: Group = {
        id: `g-${Date.now()}`,
        name: groupName,
        projectTitle: 'Not yet defined',
        status: 'PENDING',
        leaderId: loggedInStudent.id,
        memberIds: [loggedInStudent.id],
        supervisorId: formData.get('supervisor') as string,
        description: '',
        techStack: [],
        progress: 0,
        proposal: {
            title: '',
            description: '',
            techStack: [],
            status: 'NONE',
        },
        evaluationHistory: [],
    };

    setGroups(prev => [...prev, newGroup]);
    setMyGroup(newGroup);

    toast({
        title: "Group Created!",
        description: `Your new group "${groupName}" has been formed. Now, submit your proposal.`,
    });
    goToNextStep();
  }


  const handleProposalSubmission = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     if (!myGroup) return;

     const formData = new FormData(e.currentTarget);
     const title = formData.get('title') as string;

     const updatedGroup = {
        ...myGroup,
        projectTitle: title,
        proposal: {
            ...myGroup.proposal,
            title: title,
            description: formData.get('description') as string,
            techStack: (formData.get('tech-stack') as string).split(',').map(t => t.trim()),
            status: 'PENDING' as const,
        }
     };

     setMyGroup(updatedGroup);
     setGroups(prev => prev.map(g => g.id === myGroup.id ? updatedGroup : g));

     toast({
        title: "Proposal Submitted!",
        description: "Your proposal is now pending teacher approval.",
    });
    goToNextStep();
  }

  const availableGroups = groups.filter(g => g.status !== 'COMPLETED');
  const unassignedStudents = students.filter(s => !groups.some(g => g.memberIds.includes(s.id)));


  return (
    <div className="w-full max-w-4xl mx-auto">
      <nav aria-label="Progress">
        <ol
          role="list"
          className="space-y-4 md:flex md:space-x-8 md:space-y-0"
        >
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-primary transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-primary">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-border py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-muted-foreground transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-8">
        {currentStep === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Join or Create a Group</CardTitle>
              <CardDescription>
                To begin your project, you must be part of a group. Choose one of the options below.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              {/* Join Group */}
              <div className='space-y-4'>
                <h3 className='font-semibold text-lg'>Join an Existing Group</h3>
                <div className='space-y-2'>
                    {availableGroups.map(group => (
                        <div key={group.id} className='p-3 border rounded-lg flex justify-between items-center'>
                            <div>
                                <p className='font-medium'>{group.name}</p>
                                <p className='text-sm text-muted-foreground'>{group.projectTitle}</p>
                                <p className='text-xs text-muted-foreground mt-1'>Members: {group.memberIds.length}</p>
                            </div>
                            <Button size="sm" onClick={() => handleRequestJoin(group.id)}>Request to Join</Button>
                        </div>
                    ))}
                </div>
              </div>
              {/* Create Group */}
               <form onSubmit={handleGroupCreation} className='space-y-4 p-6 bg-muted/50 rounded-lg'>
                <h3 className='font-semibold text-lg'>Create a New Group</h3>
                <p className='text-sm text-muted-foreground'>Can't find a group? Create your own and invite members.</p>
                 <div className="space-y-2">
                    <Label htmlFor="group-name">Group Name</Label>
                    <Input id="group-name" name="group-name" placeholder="e.g., The Code Crusaders" required />
                </div>
                <div className="space-y-2">
                    <Label>Invite Members (Optional)</Label>
                    <Select name="members">
                        <SelectTrigger>
                            <SelectValue placeholder="Select students to invite" />
                        </SelectTrigger>
                        <SelectContent>
                             {unassignedStudents.map(student => (
                                <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                             ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Select Supervisor</Label>
                    <Select name="supervisor" required>
                        <SelectTrigger>
                        <SelectValue placeholder="Select a teacher" />
                        </SelectTrigger>
                        <SelectContent>
                            {teachers.map(teacher => (
                                <SelectItem key={teacher.id} value={teacher.id}>{teacher.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" className='w-full'><UserPlus className="mr-2 h-4 w-4" />Create Group & Proceed</Button>
              </form>
            </CardContent>
          </Card>
        )}
        {currentStep === 1 && (
             <Card>
                <form onSubmit={handleProposalSubmission}>
                    <CardHeader>
                        <CardTitle>Submit Your Project Proposal</CardTitle>
                        <CardDescription>
                        As the group leader, you are responsible for submitting the proposal for review.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                        <Label htmlFor="title">Project Title</Label>
                        <Input id="title" name="title" placeholder="A catchy and descriptive title for your project" required/>
                        </div>

                        <div className="space-y-2">
                        <Label htmlFor="description">Project Description</Label>
                        <Textarea id="description" name="description" placeholder="Provide a detailed overview of your project, its objectives, and scope." rows={8} required/>
                        </div>
                        
                        <div className="space-y-2">
                        <Label htmlFor="tech-stack">Technology Stack</Label>
                        <Input id="tech-stack" name="tech-stack" placeholder="e.g., React, Next.js, Tailwind CSS, PostgreSQL" required/>
                        <p className="text-xs text-muted-foreground">Enter technologies separated by commas.</p>
                        </div>
                        
                        <div className="space-y-2">
                        <Label htmlFor="proposal-pdf">Upload Proposal Document (PDF)</Label>
                        <Input id="proposal-pdf" name="proposal-pdf" type="file" accept=".pdf" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                         <Button
                            onClick={goToPreviousStep}
                            variant="outline"
                            type="button"
                          >
                            <ChevronLeft className="mr-2" />
                            Back
                          </Button>
                          <Button type="submit">
                            Submit Proposal <ChevronRight className="ml-2" />
                          </Button>
                    </CardFooter>
                </form>
             </Card>
        )}
        {currentStep === 2 && (
             <Card>
                <CardHeader>
                    <CardTitle>Pending Approval</CardTitle>
                    <CardDescription>
                    Your proposal for "{myGroup?.proposal.title}" has been submitted.
                    </CardDescription>
                </CardHeader>
                <CardContent className='text-center py-12'>
                    <p className='text-muted-foreground mb-2'>Current Status</p>
                    <Badge variant="secondary">{myGroup?.proposal.status.replace(/_/g, ' ')}</Badge>
                    <p className='text-sm text-muted-foreground mt-4'>Your supervisor, {teachers.find(t => t.id === myGroup?.supervisorId)?.name}, has been notified. <br/> Your access to project tools will be unlocked upon approval.</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => router.push('/student/dashboard')}>Finish & Go to Dashboard</Button>
                </CardFooter>
             </Card>
        )}
      </div>
    </div>
  );
}

    