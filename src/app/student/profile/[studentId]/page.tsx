import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { students, groups } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import { User, Brain, Heart, Group as GroupIcon } from 'lucide-react';
import Link from 'next/link';

export default function StudentProfilePage({ params }: { params: { studentId: string } }) {
  const student = students.find(s => s.id === params.studentId);

  if (!student) {
    return notFound();
  }

  const avatar = PlaceHolderImages.find((p) => p.id === student.avatar);
  const studentGroup = groups.find(g => g.memberIds.includes(student.id));

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <Avatar className="h-28 w-28 mx-auto mb-4 border-4 border-primary/20">
          {avatar && <AvatarImage src={avatar.imageUrl} alt={student.name} data-ai-hint={avatar.imageHint} />}
          <AvatarFallback className="text-4xl">{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-3xl">{student.name}</CardTitle>
        <CardDescription className="text-lg">{student.email}</CardDescription>
        <div className="flex justify-center gap-2 pt-2">
          <Badge variant="secondary">{student.department}</Badge>
          <Badge variant="secondary">Semester {student.semester}</Badge>
          <Badge variant={student.status === 'ACTIVE' ? 'default' : 'outline'}>
            {student.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="mt-6 grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><User /> Personal Information</h3>
            <div className="text-sm text-muted-foreground space-y-1 pl-6">
              <p><strong>Reg. No:</strong> {student.registrationNumber}</p>
              <p><strong>Class:</strong> {student.class} - {student.section}</p>
              <p><strong>Session:</strong> {student.session}</p>
            </div>
          </div>

           <div>
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><GroupIcon /> Group Information</h3>
            <div className="pl-6">
            {studentGroup ? (
                <Link href={`/student/groups/${studentGroup.id}`} className="text-primary hover:underline font-medium">
                    {studentGroup.name} - {studentGroup.projectTitle}
                </Link>
            ) : (
                <p className="text-sm text-muted-foreground">Not currently in a group.</p>
            )}
            </div>
          </div>

        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Brain /> Skills</h3>
            <div className="flex flex-wrap gap-2 pl-6">
                {student.skills.length > 0 ? student.skills.map(skill => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                )) : <p className="text-sm text-muted-foreground">No skills listed.</p>}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Heart /> Interests</h3>
            <p className="text-sm text-muted-foreground pl-6">{student.interests || "No interests listed."}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
