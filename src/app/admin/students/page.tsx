'use client';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function StudentManagementPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>
                Approve new student registrations and manage existing accounts.
              </CardDescription>
            </div>
             <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Student
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Enter the details for the new student.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="e.g., John Doe" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="reg-no">Registration / Seat Number</Label>
                  <Input id="reg-no" placeholder="e.g., EB12345" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="e.g., john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                   <Select>
                    <SelectTrigger id="semester">
                        <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                        {[...Array(8)].map((_, i) => (
                            <SelectItem key={i+1} value={String(i+1)}>{i+1}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                   <Select defaultValue="INACTIVE">
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Student</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
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
