'use client';
import { groups, teachers, students } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Student } from '@/lib/types';
import { useState } from 'react';

export default function MyGroupsPage() {
  const loggedInTeacherId = teachers[0].id;
  const assignedGroups = groups.filter((g) => g.supervisorId === loggedInTeacherId);
  const [selectedMembers, setSelectedMembers] = useState<Student[]>([]);

  const handleViewMembers = (memberIds: string[]) => {
    const members = students.filter(s => memberIds.includes(s.id));
    setSelectedMembers(members);
  };
  
  const getAvatarUrl = (id: string) => {
    const student = students.find((s) => s.id === id);
    if (!student) return undefined;
    return PlaceHolderImages.find((p) => p.id === student.avatar)?.imageUrl;
  };

  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold">My Groups</h1>
            <p className="text-muted-foreground">
                Here are all the groups you are currently supervising.
            </p>
        </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {assignedGroups.map((group) => (
            <Card key={group.id} className="h-full flex flex-col">
              <Link href={`/teacher/groups/${group.id}`} className="block hover:bg-muted/30 transition-colors h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{group.name}</CardTitle>
                    <Badge variant={group.status === 'ACTIVE' ? 'default' : 'outline'}>{group.status}</Badge>
                  </div>
                  <CardDescription>{group.projectTitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                      <p className="text-sm font-medium">Progress</p>
                      <div className="flex items-center gap-4">
                          <Progress value={group.progress} />
                          <span className="text-sm font-bold">{group.progress}%</span>
                      </div>
                  </div>
                </CardContent>
              </Link>
              <CardFooter>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="link" className="p-0 h-auto text-sm" onClick={() => handleViewMembers(group.memberIds)}>
                            View {group.memberIds.length} members
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Members of {group.name}</DialogTitle>
                        </DialogHeader>
                         <div className="py-4 space-y-4">
                            {selectedMembers.map((member) => (
                            <div key={member.id} className="flex items-center gap-4">
                                <Avatar>
                                <AvatarImage src={getAvatarUrl(member.id)} />
                                <AvatarFallback>
                                    {member.name.charAt(0)}
                                </AvatarFallback>
                                </Avatar>
                                <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {member.email}
                                </p>
                                </div>
                            </div>
                            ))}
                        </div>
                    </DialogContent>
                 </Dialog>
              </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
