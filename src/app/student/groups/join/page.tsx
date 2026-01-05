import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Lightbulb } from "lucide-react";
import GroupSuggestionForm from "../_components/group-suggestion-form";

export default function JoinGroupPage() {
  return (
    <div className="grid gap-8 md:grid-cols-5">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Join a Group</CardTitle>
            <CardDescription>Enter the unique code for the group you want to join.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="group-code">Group Code</Label>
              <Input id="group-code" placeholder="e.g., A4B1C2" />
            </div>
            <Button className="w-full">Join with Code</Button>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-3">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              <CardTitle>Intelligent Group Suggestions</CardTitle>
            </div>
            <CardDescription>
              Don't have a group yet? Get AI-powered suggestions based on your profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GroupSuggestionForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
