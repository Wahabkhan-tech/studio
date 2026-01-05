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
import { groups, students as allStudents, sessions as allSessions } from '@/lib/data';
import { useState } from 'react';
import { AttendanceTracker } from '@/components/attendance-tracker';

export default function AttendanceManagementPage() {
  const teacherGroups = groups.filter((g) => g.supervisorId === 't1');
  const [selectedGroupId, setSelectedGroupId] = useState(teacherGroups[0].id);

  const selectedGroup = teacherGroups.find(g => g.id === selectedGroupId)!;
  const groupMembers = allStudents.filter(s => selectedGroup.memberIds.includes(s.id));
  const groupSessions = allSessions.filter(s => s.groupId === selectedGroupId);

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
          <Select defaultValue={selectedGroupId} onValueChange={setSelectedGroupId}>
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
        />
      </CardContent>
    </Card>
  );
}
