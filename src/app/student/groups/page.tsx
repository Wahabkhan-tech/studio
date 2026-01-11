
'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GroupSuggestionForm from './_components/group-suggestion-form';
import { groups, teachers } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function FindGroupPage() {

    const availableGroups = groups.filter(g => g.status !== 'COMPLETED');

    return (
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Browse Available Groups</CardTitle>
                        <CardDescription>
                            Here are the groups currently looking for members.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {availableGroups.map(group => {
                            const supervisor = teachers.find(t => t.id === group.supervisorId);
                            return (
                                <Card key={group.id}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{group.name}</CardTitle>
                                        <CardDescription>{group.projectTitle}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
                                        <div className="flex flex-wrap gap-1">
                                            {group.techStack.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                                        </div>
                                         <p className="text-xs text-muted-foreground pt-2">
                                            Supervisor: {supervisor?.name} | Members: {group.memberIds.length}
                                        </p>
                                    </CardContent>
                                    <CardContent>
                                        <Button className="w-full">Request to Join</Button>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </CardContent>
                 </Card>
            </div>
            <div>
                <Card className="sticky top-24">
                    <CardHeader>
                        <CardTitle>Get AI Suggestions</CardTitle>
                        <CardDescription>Not sure where to start? Let our AI find the best fit for you based on your skills and interests.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <GroupSuggestionForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
