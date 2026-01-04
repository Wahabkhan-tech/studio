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
import { groups, teachers } from '@/lib/data';

export default function GroupOverviewPage() {
  return (
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
                    <div>{group.name}</div>
                    <div className="text-sm text-muted-foreground">{group.projectTitle}</div>
                  </TableCell>
                  <TableCell>{supervisor?.name}</TableCell>
                  <TableCell>
                    <Badge variant={group.status === 'ACTIVE' ? 'secondary' : 'outline'}>
                      {group.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{group.memberIds.length}</TableCell>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
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
  );
}
