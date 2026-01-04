import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProposalSubmissionPage() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Your Project Proposal</CardTitle>
        <CardDescription>
          As the group leader, you are responsible for submitting the proposal for review.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input id="title" placeholder="A catchy and descriptive title for your project" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Project Description</Label>
          <Textarea id="description" placeholder="Provide a detailed overview of your project, its objectives, and scope." rows={8} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tech-stack">Technology Stack</Label>
          <Input id="tech-stack" placeholder="e.g., React, Next.js, Tailwind CSS, PostgreSQL" />
          <p className="text-xs text-muted-foreground">Enter technologies separated by commas.</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="proposal-pdf">Upload Proposal Document (PDF)</Label>
          <Input id="proposal-pdf" type="file" accept=".pdf" />
        </div>
        
        <div className="flex justify-end pt-4">
            <Button>Submit for Review</Button>
        </div>
      </CardContent>
    </Card>
  );
}
