import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Book } from 'lucide-react';

export default function ProposalMonitoringPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Proposal Monitoring</CardTitle>
        <CardDescription>
          Monitor the status of all project proposals. (Placeholder)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Book className="w-24 h-24 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">Coming Soon</h3>
        <p className="text-muted-foreground">This page is under construction.</p>
      </CardContent>
    </Card>
  );
}
