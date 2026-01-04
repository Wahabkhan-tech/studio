import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LineChart } from 'lucide-react';

export default function EvaluationReportsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evaluation Reports</CardTitle>
        <CardDescription>
          Generate and view evaluation reports. (Placeholder)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <LineChart className="w-24 h-24 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">Coming Soon</h3>
        <p className="text-muted-foreground">This page is under construction.</p>
      </CardContent>
    </Card>
  );
}
