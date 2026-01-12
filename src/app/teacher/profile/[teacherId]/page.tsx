import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { teachers, groups } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import { Briefcase, Building, Mail, Package } from 'lucide-react';
import Link from 'next/link';

export default function TeacherProfilePage({ params }: { params: { teacherId: string } }) {
  const teacher = teachers.find(t => t.id === params.teacherId);

  if (!teacher) {
    return notFound();
  }

  const avatar = PlaceHolderImages.find((p) => p.id === teacher.avatar);
  const supervisedGroups = groups.filter(g => g.supervisorId === teacher.id);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <Avatar className="h-28 w-28 mx-auto mb-4 border-4 border-primary/20">
          {avatar && <AvatarImage src={avatar.imageUrl} alt={teacher.name} data-ai-hint={avatar.imageHint} />}
          <AvatarFallback className="text-4xl">{teacher.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-3xl">{teacher.name}</CardTitle>
        <CardDescription className="text-lg">{teacher.email}</CardDescription>
        <div className="flex justify-center gap-2 pt-2">
          <Badge variant="secondary">{teacher.designation}</Badge>
          <Badge variant="secondary">{teacher.department}</Badge>
        </div>
      </CardHeader>
      <CardContent className="mt-6">
        <div className="max-w-2xl mx-auto">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Package /> Supervised Groups</h3>
            <div className="space-y-2">
                {supervisedGroups.length > 0 ? supervisedGroups.map(group => (
                    <Link key={group.id} href={`/teacher/groups/${group.id}`}>
                        <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                            <p className="font-medium">{group.name}</p>
                            <p className="text-sm text-muted-foreground">{group.projectTitle}</p>
                        </div>
                    </Link>
                )) : (
                    <p className="text-sm text-muted-foreground text-center py-4">Not supervising any groups.</p>
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
