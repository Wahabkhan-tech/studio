'use client';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { groups, teachers, students } from '@/lib/data';
import Link from 'next/link';
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

export default function GroupOverviewPage() {
  const [selectedMembers, setSelectedMembers] = useState<Student[]>([]);
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);

  const handleViewMembers = (memberIds: string[]) => {
    const members = students.filter(s => memberIds.includes(s.id));
    setSelectedMembers(members);
    setIsMemberDialogOpen(true);
  };
  
  const getAvatarUrl = (id: string) => {
    const student = students.find((s) => s.id === id);
    if (!student) return undefined;
    return PlaceHolderImages.find((p) => p.id === student.avatar)?.imageUrl;
  };

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Group Overview</CardTitle>
        <CardDescription>View and manage all student groups.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead>Supervisor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Members</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => {
              const supervisor = teachers.find((t) => t.id === group.supervisorId);
              return (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/groups/${group.id}`} className="hover:underline text-primary">
                        <div>{group.name}</div>
                        <div className="text-sm text-muted-foreground">{group.projectTitle}</div>
                    </Link>
                  </TableCell>
                  <TableCell>{supervisor?.name}</TableCell>
                  <TableCell>
                    <Badge variant={group.status === 'ACTIVE' ? 'secondary' : 'outline'}>
                      {group.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Button variant="link" className="p-0 h-auto" onClick={() => handleViewMembers(group.memberIds)}>
                        {group.memberIds.length} members
                    </Button>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                         <DropdownMenuItem asChild>
                           <Link href={`/admin/groups/${group.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Assign Supervisor</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{groups.length}</strong> of <strong>{groups.length}</strong> groups
        </div>
      </CardFooter>
    </Card>

    <Dialog open={isMemberDialogOpen} onOpenChange={setIsMemberDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Group Members</DialogTitle>
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
    </>
  );
}
