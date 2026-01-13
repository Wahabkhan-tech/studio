'use client';
import { groups, teachers } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { useActivity } from '@/context/ActivityContext';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function ProposalMonitoringPage() {
  const [allGroups, setAllGroups] = useState(groups);
  const { addActivity } = useActivity();
  const { toast } = useToast();

  const handleStatusChange = (groupId: string, newStatus: 'APPROVED' | 'REJECTED') => {
    const updatedGroups = allGroups.map(g => {
        if (g.id === groupId) {
            return {...g, proposal: {...g.proposal, status: newStatus}}
        }
        return g;
    });
    setAllGroups(updatedGroups);

    const group = allGroups.find(g => g.id === groupId);
    if(group) {
        addActivity(`Proposal for "${group.name}" was ${newStatus.toLowerCase()}.`, 'proposal');
        toast({
            title: `Proposal ${newStatus}`,
            description: `The proposal for "${group.name}" has been marked as ${newStatus.toLowerCase()}.`
        });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proposal Monitoring</CardTitle>
        <CardDescription>
          Monitor the status of all project proposals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group</TableHead>
              <TableHead>Project Title</TableHead>
              <TableHead>Supervisor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allGroups.map((group) => {
              const supervisor = teachers.find(t => t.id === group.supervisorId);
              return (
                <TableRow key={group.id}>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>{group.proposal.title}</TableCell>
                  <TableCell>{supervisor?.name}</TableCell>
                  <TableCell>
                    <Badge variant={
                      group.proposal.status === 'APPROVED' ? 'default' :
                      group.proposal.status === 'REJECTED' ? 'destructive' :
                      'secondary'
                    }>
                      {group.proposal.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/groups/${group.id}?tab=proposal`}>View</Link>
                    </Button>
                     {group.proposal.status === 'PENDING' && (
                        <>
                        <Button size="sm" onClick={() => handleStatusChange(group.id, 'APPROVED')}>Approve</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleStatusChange(group.id, 'REJECTED')}>Reject</Button>
                        </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
