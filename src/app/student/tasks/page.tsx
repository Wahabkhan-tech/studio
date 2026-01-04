import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';

export default function StudentTasksPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Tasks</CardTitle>
        <CardDescription>
          View and manage tasks assigned to you. (Placeholder)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <ClipboardList className="w-24 h-24 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">Coming Soon</h3>
        <p className="text-muted-foreground">This page is under construction.</p>
      </CardContent>
    </Card>
  );
}
