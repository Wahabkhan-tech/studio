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
import { Textarea } from '@/components/ui/textarea';
import { teachers } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function TeacherProfilePage() {
  const teacher = teachers[0];
  const avatar = PlaceHolderImages.find((p) => p.id === teacher.avatar);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
        <CardDescription>
          Manage your profile information and availability.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            {avatar && <AvatarImage src={avatar.imageUrl} alt={teacher.name} data-ai-hint={avatar.imageHint} />}
            <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
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
            <Input id="name" defaultValue={teacher.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={teacher.email} disabled />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" defaultValue={teacher.department} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input id="designation" defaultValue={teacher.designation} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interests">Research Interests</Label>
          <Textarea id="interests" placeholder="e.g., Artificial Intelligence, Machine Learning, HCI..." defaultValue="Human-Computer Interaction, AI in Education" />
        </div>

         <div className="space-y-2">
          <Label>Availability Hours</Label>
           <p className="text-sm text-muted-foreground">Set times when you are available for student consultations.</p>
           <div className='flex gap-2'>
            <Badge variant="outline">MON: 10:00 - 12:00</Badge>
            <Badge variant="outline">WED: 14:00 - 16:00</Badge>
            <Badge variant="outline">FRI: 11:00 - 13:00</Badge>
           </div>
           <Button variant="link" className="p-0 h-auto">Edit Availability</Button>
        </div>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
