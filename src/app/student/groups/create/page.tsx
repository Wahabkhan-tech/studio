import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { students, teachers } from "@/lib/data";

export default function CreateGroupPage() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create a New Group</CardTitle>
        <CardDescription>
          Assemble your team and select a supervisor to kickstart your project.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="group-name">Group Name</Label>
          <Input id="group-name" placeholder="e.g., The Code Crusaders" />
        </div>

        <div className="space-y-2">
            <Label htmlFor="project-title">Project Title</Label>
            <Input id="project-title" placeholder="e.g., AI-Powered Health Diagnosis App" />
        </div>

        <div className="space-y-2">
          <Label>Select Members</Label>
          <p className="text-sm text-muted-foreground">You will be the group leader. Select other members to invite.</p>
           {/* In a real app, this would be a multi-select component. Using a single select for demo. */}
           <Select>
            <SelectTrigger>
                <SelectValue placeholder="Select members to invite" />
            </SelectTrigger>
            <SelectContent>
                 {students.filter(s => s.id !== 's1').map(student => (
                     <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                 ))}
            </SelectContent>
           </Select>
        </div>

        <div className="space-y-2">
          <Label>Select Supervisor</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a teacher" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Teachers</SelectLabel>
                {teachers.map(teacher => (
                     <SelectItem key={teacher.id} value={teacher.id}>{teacher.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-end pt-4">
            <Button>Create Group</Button>
        </div>
      </CardContent>
    </Card>
  );
}
