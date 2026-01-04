import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building } from 'lucide-react';

export default function DepartmentManagementPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Management</CardTitle>
        <CardDescription>
          Manage academic departments. (Placeholder)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Building className="w-24 h-24 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">Coming Soon</h3>
        <p className="text-muted-foreground">This page is under construction.</p>
      </CardContent>
    </Card>
  );
}
