import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Cog } from 'lucide-react';

export default function SystemSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>
          Configure system-wide settings. (Placeholder)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Cog className="w-24 h-24 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">Coming Soon</h3>
        <p className="text-muted-foreground">This page is under construction.</p>
      </CardContent>
    </Card>
  );
}
