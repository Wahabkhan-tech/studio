import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SystemSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>
          Manage system-wide settings and configurations.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="max-group-size">Max Group Size</Label>
            <Input id="max-group-size" type="number" defaultValue="5" />
            <p className="text-sm text-muted-foreground">
              Maximum number of students allowed in a single group.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-limit">Session Time Limit (Minutes)</Label>
            <Input id="session-limit" type="number" defaultValue="60" />
            <p className="text-sm text-muted-foreground">
              Set the maximum duration for live video sessions.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="proposal-deadline">Proposal Submission Deadline</Label>
                <Input id="proposal-deadline" type="date" defaultValue="2024-09-30" />
                <p className="text-sm text-muted-foreground">
                Final date for students to submit their project proposals.
                </p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="final-submission-deadline">Final Project Deadline</Label>
                <Input id="final-submission-deadline" type="date" defaultValue="2025-05-15" />
                <p className="text-sm text-muted-foreground">
                Final date for all project deliverables.
                </p>
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="semester-session">Current Academic Session</Label>
            <Select defaultValue='fall-2024'>
                <SelectTrigger id="semester-session">
                    <SelectValue placeholder="Select session" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="fall-2024">Fall 2024</SelectItem>
                    <SelectItem value="spring-2025">Spring 2025</SelectItem>
                    <SelectItem value="summer-2025">Summer 2025</SelectItem>
                </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Set the active academic semester/session for the entire system.
            </p>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Save Settings</Button>
      </CardFooter>
    </Card>
  );
}
