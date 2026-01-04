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

export default function ProposalMonitoringPage() {
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
            {groups.map((group) => {
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
                  <TableCell>
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/groups/${group.id}?tab=proposal`}>View</Link>
                    </Button>
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
