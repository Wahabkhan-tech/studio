import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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
import { students } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function StudentManagementPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Management</CardTitle>
        <CardDescription>
          Approve new student registrations and manage existing accounts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Avatar</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => {
              const avatar = PlaceHolderImages.find((img) => img.id === student.avatar);
              return (
              <TableRow key={student.id}>
                <TableCell className="hidden sm:table-cell">
                  <Avatar className="h-10 w-10">
                    {avatar && <AvatarImage src={avatar.imageUrl} alt={student.name} data-ai-hint={avatar.imageHint} />}
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  <div>{student.name}</div>
                  <div className="text-sm text-muted-foreground">{student.email}</div>
                </TableCell>
                 <TableCell>
                  {student.semester}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={student.status === 'ACTIVE' ? 'default' : 'destructive'}>
                    {student.status}
                  </Badge>
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
                      {student.status === 'INACTIVE' && <DropdownMenuItem>Approve</DropdownMenuItem>}
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Disable
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-6</strong> of <strong>6</strong> students
        </div>
      </CardFooter>
    </Card>
  );
}
