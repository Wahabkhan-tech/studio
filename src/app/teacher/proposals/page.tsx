import { groups, teachers } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, FileText, Send, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function ProposalReviewPage() {
  const pendingProposals = groups.filter(
    (g) => g.proposal.status === 'PENDING' && g.supervisorId === 't1'
  );

  const proposal = pendingProposals[0]; // For demonstration, we'll review the first pending proposal.
  const supervisor = teachers.find((t) => t.id === proposal.supervisorId);

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{proposal.proposal.title}</CardTitle>
                <CardDescription>
                  Submitted by {proposal.name}
                </CardDescription>
              </div>
              <Badge variant="secondary">{proposal.proposal.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{proposal.proposal.description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {proposal.proposal.techStack.map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
               <div>
                <h3 className="font-semibold mb-2">Submitted Document</h3>
                <Button variant="outline" asChild>
                    <Link href="#">
                        <FileText className="mr-2 h-4 w-4" />
                        View Proposal.pdf
                    </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Review & Feedback</CardTitle>
            <CardDescription>
              Approve, reject, or request changes for this proposal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Textarea placeholder="Provide your feedback here..." rows={5}/>
             <div className="grid grid-cols-1 gap-2">
                <Button>
                    <Check className="mr-2 h-4 w-4" />Approve
                </Button>
                <Button variant="destructive">
                    <X className="mr-2 h-4 w-4" />Reject
                </Button>
                 <Button variant="outline">
                    <Send className="mr-2 h-4 w-4" />Request Changes
                </Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
