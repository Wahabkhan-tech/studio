'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Group, Student, Session, UserRole } from '@/lib/types';
import { useState } from 'react';

interface AttendanceTrackerProps {
  role: UserRole;
  group: Group;
  sessions: Session[];
  members: Student[];
  onAttendanceChange?: (sessionId: string, studentId: string, isPresent: boolean) => void;
}

export function AttendanceTracker({
  role,
  sessions,
  members,
  onAttendanceChange,
}: AttendanceTrackerProps) {
  // In a real app, attendance state would be managed via a server/database.
  // Here we simulate it with local state for demonstration.
  const [attendance, setAttendance] = useState(() => {
    const initialState: { [sessionId: string]: string[] } = {};
    sessions.forEach((session) => {
      initialState[session.id] = session.attendees;
    });
    return initialState;
  });

  const handleAttendanceClick = (sessionId: string, studentId: string, markAsPresent: boolean) => {
    if (role !== 'teacher') return;

    setAttendance((prev) => {
      const sessionAttendees = prev[sessionId] ? [...prev[sessionId]] : [];
      const studentIndex = sessionAttendees.indexOf(studentId);

      const isCurrentlyPresent = studentIndex > -1;

      if (markAsPresent && !isCurrentlyPresent) {
        sessionAttendees.push(studentId);
      } else if (!markAsPresent && isCurrentlyPresent) {
        sessionAttendees.splice(studentIndex, 1);
      } else {
        // No change needed
        return prev;
      }
      
      // Notify parent component of the change
      onAttendanceChange?.(sessionId, studentId, markAsPresent);

      return { ...prev, [sessionId]: sessionAttendees };
    });
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No sessions have been scheduled for this group yet.
      </div>
    );
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold w-[150px] sticky left-0 bg-background z-10">
                Student
              </TableHead>
              {sessions.map((session) => (
                <TableHead key={session.id} className="text-center">
                  {new Date(session.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium sticky left-0 bg-background/95 backdrop-blur-sm z-10">
                  {member.name}
                </TableCell>
                {sessions.map((session) => {
                  const isPresent = attendance[session.id]?.includes(member.id);
                  return (
                    <TableCell key={session.id} className="text-center">
                      {role === 'teacher' ? (
                        <div className="flex justify-center gap-1">
                          <Button
                            size="icon"
                            variant={isPresent ? 'default' : 'outline'}
                            className="h-7 w-7 rounded-full"
                            onClick={() =>
                              handleAttendanceClick(session.id, member.id, true)
                            }
                          >
                            P
                          </Button>
                          <Button
                            size="icon"
                            variant={!isPresent ? 'destructive' : 'outline'}
                            className="h-7 w-7 rounded-full"
                            onClick={() =>
                              handleAttendanceClick(session.id, member.id, false)
                            }
                          >
                            A
                          </Button>
                        </div>
                      ) : (
                        <Badge variant={isPresent ? 'default' : 'destructive'}>
                          {isPresent ? 'P' : 'A'}
                        </Badge>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
