import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FilePen } from 'lucide-react';

export default function EvaluationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evaluation</CardTitle>
        <CardDescription>
          Provide final evaluations and marks for your groups.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[500px] text-center">
        <FilePen className="w-24 h-24 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">Evaluation Area</h3>
        <p className="text-muted-foreground">
          This is where you will submit final grades and feedback. <br />
          (Evaluation form coming soon)
        </p>
      </CardContent>
    </Card>
  );
}
