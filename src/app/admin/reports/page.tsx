
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { groups } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function EvaluationReportsPage() {
    const { toast } = useToast();

    const handleExport = () => {
        toast({
            title: "Exporting Reports (Simulation)",
            description: "A CSV file with all evaluation data would be downloaded.",
        });
    }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Evaluation & Reports</CardTitle>
            <CardDescription>
              View final marks and export reports.
            </CardDescription>
          </div>
          <Button size="sm" className="gap-1" onClick={handleExport}>
            <Download className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export All
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group</TableHead>
              <TableHead>Project Title</TableHead>
              <TableHead>Final Score</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className="font-medium">{group.name}</TableCell>
                <TableCell>{group.projectTitle}</TableCell>
                <TableCell>{(group.progress * 0.9 + 5).toFixed(1)} / 100</TableCell>
                <TableCell>{group.progress > 80 ? 'A' : group.progress > 60 ? 'B' : 'C'}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

    