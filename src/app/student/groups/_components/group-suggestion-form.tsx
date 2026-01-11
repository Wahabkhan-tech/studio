
"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { suggestGroups, SuggestGroupsInput, SuggestGroupsOutput } from "@/ai/flows/intelligent-group-suggestions";
import { groups, students, teachers } from '@/lib/data';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  skills: z.string().min(3, "Please list at least one skill."),
  interests: z.string().min(10, "Please describe your interests."),
});

type FormValues = z.infer<typeof formSchema>;

export default function GroupSuggestionForm() {
  const [suggestions, setSuggestions] = useState<SuggestGroupsOutput>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: students[0].skills.join(', '),
      interests: students[0].interests,
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);
    
    const availableGroups = groups.filter(g => g.status !== 'COMPLETED').map(g => ({
        groupId: g.id,
        groupName: g.name,
        projectTitle: g.projectTitle,
        techStack: g.techStack,
        description: g.description,
    }));

    const input: SuggestGroupsInput = {
      studentProfile: {
        skills: data.skills.split(',').map(s => s.trim()),
        interests: data.interests,
      },
      availableGroups: availableGroups,
    };

    try {
      const result = await suggestGroups(input);
      setSuggestions(result);
    } catch (e) {
      setError("Failed to get suggestions. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRequestToJoin = (groupName: string) => {
    toast({
        title: "Request Sent!",
        description: `Your request to join "${groupName}" has been sent to the group leader.`,
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="skills" className="text-sm font-medium">Your Skills</label>
          <Input id="skills" {...register("skills")} placeholder="e.g., React, Python, UI/UX Design" />
          {errors.skills && <p className="text-sm text-destructive mt-1">{errors.skills.message}</p>}
        </div>
        <div>
          <label htmlFor="interests" className="text-sm font-medium">Your Interests</label>
          <Textarea id="interests" {...register("interests")} placeholder="Describe your project interests..." />
          {errors.interests && <p className="text-sm text-destructive mt-1">{errors.interests.message}</p>}
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Get Suggestions
        </Button>
      </form>

      {error && <p className="text-destructive text-center mt-4">{error}</p>}
      
      {suggestions.length > 0 && (
        <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg">Here are some suggestions for you:</h3>
          {suggestions.map((suggestion) => {
            const group = groups.find(g => g.id === suggestion.groupId);
            if (!group) return null;
            const supervisor = teachers.find(t => t.id === group.supervisorId);
            return (
              <Card key={suggestion.groupId} className="bg-background">
                <CardHeader>
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>{group.projectTitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm font-semibold">Why it's a good fit:</p>
                        <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Tech Stack:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {group.techStack.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Supervisor: {supervisor?.name}</p>
                        <p className="text-sm text-muted-foreground">Members: {group.memberIds.length}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={() => handleRequestToJoin(group.name)}>Request to Join</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
