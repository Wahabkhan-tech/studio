
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { students } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function ProfileCompletionPage() {
  const student = students[0];
  const avatar = PlaceHolderImages.find((p) => p.id === student.avatar);
  const profileStatus = "PENDING_APPROVAL"; // This would be dynamic

  const getStatusVariant = () => {
    switch (profileStatus) {
        case 'COMPLETE': return 'default';
        case 'PENDING_APPROVAL': return 'secondary';
        case 'INCOMPLETE':
        default: return 'destructive';
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className='flex justify-between items-center'>
            <div>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>
                Keep your information up-to-date to help supervisors and group members.
                </CardDescription>
            </div>
            <div className='text-right'>
                <Label className='text-xs text-muted-foreground'>Profile Status</Label>
                <Badge variant={getStatusVariant()} className='mt-1'>
                    {profileStatus.replace(/_/g, ' ')}
                </Badge>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
                {avatar && <AvatarImage src={avatar.imageUrl} alt={student.name} data-ai-hint={avatar.imageHint} />}
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
                <Label htmlFor="picture">Profile Photo</Label>
                <Input id="picture" type="file" />
                <p className="text-xs text-muted-foreground">Upload a new photo. Max 2MB.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={student.name} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={student.email} disabled />
            </div>
        </div>
        
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" placeholder="Your phone number" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="eb-number">EB Number</Label>
                <Input id="eb-number" defaultValue="EB123456" disabled/>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                 <Select defaultValue={String(student.semester)}>
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
                <Label htmlFor="skills">Skills</Label>
                <Input id="skills" placeholder="React, Node.js, Python..." defaultValue={student.skills.join(', ')} />
                <p className="text-xs text-muted-foreground">Enter skills separated by commas.</p>
            </div>
        </div>
        
        <div className="space-y-2">
            <Label htmlFor="interests">Interests & Group Preferences</Label>
            <Textarea id="interests" placeholder="I'm passionate about..." defaultValue={student.interests} />
        </div>

        <div className="flex justify-end">
            <Button>Save Changes</Button>
        </div>

      </CardContent>
    </Card>
  );
}
