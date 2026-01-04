import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function AdminChatPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System-Wide Communication</CardTitle>
        <CardDescription>
          Communicate with teachers and send system-wide announcements.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[500px] text-center">
        <MessageSquare className="w-24 h-24 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">Admin Chat Interface</h3>
        <p className="text-muted-foreground">
          This is where you will manage communications. <br />
          (Chat functionality coming soon)
        </p>
      </CardContent>
    </Card>
  );
}
