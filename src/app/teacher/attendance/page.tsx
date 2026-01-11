'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  groups as allGroups,
  students as allStudents,
  sessions as allSessions,
  teachers,
} from '@/lib/data';
import { useState } from 'react';
import { AttendanceTracker } from '@/components/attendance-tracker';
import { useToast } from '@/hooks/use-toast';

export default function AttendanceManagementPage() {
  const { toast } = useToast();
  const loggedInTeacherId = 'T01';
  const teacherGroups = allGroups.filter((g) => g.supervisorId === loggedInTeacherId);

  // Handle case where teacher has no groups
  if (teacherGroups.length === 0) {
    return (
       <Card>
        <CardHeader>
          <CardTitle>Attendance Management</CardTitle>
        </CardHeader>
        <CardContent>
            <p>You are not supervising any groups yet.</p>
        </CardContent>
      </Card>
    )
  }

  const [selectedGroupId, setSelectedGroupId] = useState(teacherGroups[0].id);

  const selectedGroup = teacherGroups.find((g) => g.id === selectedGroupId)!;
  const groupMembers = allStudents.filter((s) => selectedGroup.memberIds.includes(s.id));
  const groupSessions = allSessions.filter((s) => s.groupId === selectedGroupId);
  
  const handleAttendanceChange = (sessionId: string, studentId: string, isPresent: boolean) => {
    // This is a simulation. In a real app, you'd send this to a server.
    toast({
        title: "Attendance Marked",
        description: `${allStudents.find(s => s.id === studentId)?.name} marked as ${isPresent ? 'Present' : 'Absent'}.`
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Management</CardTitle>
        <CardDescription>
          Select a group to view and manage student attendance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex-1">
          <label className="text-sm font-medium">Group</label>
          <Select
            defaultValue={selectedGroupId}
            onValueChange={setSelectedGroupId}
          >
            <SelectTrigger className="w-full md:w-1/2">
              <SelectValue placeholder="Select a group" />
            </SelectTrigger>
            <SelectContent>
              {teacherGroups.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <AttendanceTracker
          role="teacher"
          group={selectedGroup}
          members={groupMembers}
          sessions={groupSessions}
          onAttendanceChange={handleAttendanceChange}
        />
      </CardContent>
    </Card>
  );
}
