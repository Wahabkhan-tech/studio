
'use client';
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
import { Check, FileText, Send, X, Inbox } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function ProposalReviewPage() {
  const { toast } = useToast();
  const loggedInTeacherId = teachers[0].id;
  const [pendingProposals, setPendingProposals] = useState(
    groups.filter(
      (g) =>
        g.proposal.status === 'PENDING' && g.supervisorId === loggedInTeacherId
    )
  );

  const handleReviewAction = (
    proposalTitle: string,
    action: 'Approved' | 'Rejected' | 'Changes Requested'
  ) => {
    toast({
      title: `Proposal ${action}`,
      description: `The proposal "${proposalTitle}" has been ${action.toLowerCase()}.`,
    });
    // In a real app, this would also update the backend.
    // For the demo, we'll just remove the proposal from the pending list.
    setPendingProposals((prev) =>
      prev.filter((p) => p.proposal.title !== proposalTitle)
    );
  };

  if (pendingProposals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Proposal Review</CardTitle>
          <CardDescription>
            There are no pending proposals that require your review at the
            moment.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <Inbox className="w-24 h-24 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold">All Caught Up!</h3>
          <p className="text-muted-foreground">
            You have reviewed all submitted proposals.
          </p>
        </CardContent>
      </Card>
    );
  }

  const proposal = pendingProposals[0]; // For demonstration, we'll review the first pending proposal.

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">
                  {proposal.proposal.title}
                </CardTitle>
                <CardDescription>Submitted by {proposal.name}</CardDescription>
              </div>
              <Badge variant="secondary">{proposal.proposal.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">
                  {proposal.proposal.description}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {proposal.proposal.techStack.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
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
            <Textarea placeholder="Provide your feedback here..." rows={5} />
            <div className="grid grid-cols-1 gap-2">
              <Button
                onClick={() =>
                  handleReviewAction(proposal.proposal.title, 'Approved')
                }
              >
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  handleReviewAction(proposal.proposal.title, 'Rejected')
                }
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  handleReviewAction(proposal.proposal.title, 'Changes Requested')
                }
              >
                <Send className="mr-2 h-4 w-4" />
                Request Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
