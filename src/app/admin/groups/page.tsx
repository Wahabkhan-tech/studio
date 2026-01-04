import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Package } from 'lucide-react';

export default function GroupOverviewPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Group Overview</CardTitle>
        <CardDescription>
          View and manage all student groups. (Placeholder)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Package className="w-24 h-24 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">Coming Soon</h3>
        <p className="text-muted-foreground">This page is under construction.</p>
      </CardContent>
    </Card>
  );
}
