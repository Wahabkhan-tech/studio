import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { groups, students as allStudents } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function AttendanceManagementPage() {
    const teacherGroups = groups.filter(g => g.supervisorId === 't1');
    const firstGroupStudents = allStudents.filter(s => teacherGroups[0].memberIds.includes(s.id));
  
    return (
        <Card>
            <CardHeader>
                <CardTitle>Attendance Management</CardTitle>
                <CardDescription>Select a group and date to mark student attendance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="text-sm font-medium">Group</label>
                        <Select defaultValue={teacherGroups[0].id}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a group" />
                            </SelectTrigger>
                            <SelectContent>
                                {teacherGroups.map(group => (
                                    <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1">
                        <label className="text-sm font-medium">Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !Date.now() && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {format(new Date(), "PPP")}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={new Date()}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead className="text-right">Attendance</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {firstGroupStudents.map(student => {
                                const avatar = PlaceHolderImages.find((img) => img.id === student.avatar);
                                return (
                                <TableRow key={student.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-10 w-10">
                                                {avatar && <AvatarImage src={avatar.imageUrl} alt={student.name} data-ai-hint={avatar.imageHint}/>}
                                                <AvatarFallback>{student.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{student.name}</div>
                                                <div className="text-sm text-muted-foreground">{student.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                       <div className="flex items-center justify-end gap-2">
                                            <span className="text-muted-foreground">Absent</span>
                                            <Switch defaultChecked={true} aria-label={`Mark ${student.name} as present or absent`}/>
                                            <span className="font-medium">Present</span>
                                       </div>
                                    </TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-end">
                    <Button>Submit Attendance</Button>
                </div>
            </CardContent>
        </Card>
    );
}
