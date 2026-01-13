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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { useState } from 'react';
import type { Group } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

export default function EvaluationReportsPage() {
  const { toast } = useToast();
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const handleExport = () => {
    toast({
      title: 'Exporting Reports',
      description: 'A CSV file with all evaluation data has been downloaded.',
    });
  };

  const handleViewDetails = (group: Group) => {
    setSelectedGroup(group);
  };

  const calculateGrade = (progress: number) => {
      const score = (progress * 0.9 + 5);
      if (score > 90) return 'A+';
      if (score > 80) return 'A';
      if (score > 70) return 'B';
      if (score > 60) return 'C';
      if (score > 50) return 'D';
      return 'F';
  }

  return (
    <>
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
                  <TableCell>
                    {(group.progress * 0.9 + 5).toFixed(1)} / 100
                  </TableCell>
                  <TableCell>{calculateGrade(group.progress)}</TableCell>
                  <TableCell className="text-right">
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(group)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {selectedGroup && (
        <Dialog open={!!selectedGroup} onOpenChange={(isOpen) => !isOpen && setSelectedGroup(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Evaluation for "{selectedGroup.name}"</DialogTitle>
              <DialogDescription>{selectedGroup.projectTitle}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className='p-4 border rounded-lg'>
                    <div className="flex justify-between items-center font-bold text-lg">
                        <span>Final Score</span>
                        <span>{(selectedGroup.progress * 0.9 + 5).toFixed(1)} / 100</span>
                    </div>
                     <div className="flex justify-between items-center font-bold text-lg text-primary mt-1">
                        <span>Grade</span>
                        <span>{calculateGrade(selectedGroup.progress)}</span>
                    </div>
                </div>
              <div>
                <h4 className="font-semibold mb-2">Progress Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Proposal</span> <span>10%</span></div>
                  <Progress value={100} className="h-2"/>
                  <div className="flex justify-between"><span>Mid-term Defense</span> <span>30%</span></div>
                   <Progress value={selectedGroup.progress > 50 ? 100 : selectedGroup.progress * 2} className="h-2"/>
                  <div className="flex justify-between"><span>Final Submission</span> <span>60%</span></div>
                   <Progress value={Math.max(0, selectedGroup.progress - 50) * 2} className="h-2"/>
                </div>
              </div>
               <div>
                <h4 className="font-semibold mb-2">Final Supervisor Comment</h4>
                <p className='text-sm text-muted-foreground p-3 bg-muted/50 rounded-md border'>
                    {selectedGroup.evaluationHistory[0]?.comment || "No final comments recorded."}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
