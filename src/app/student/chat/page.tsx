import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function StudentChatPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat</CardTitle>
        <CardDescription>
          Chat with your group members and your supervisor.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[500px] text-center">
        <MessageSquare className="w-24 h-24 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">Student Chat Interface</h3>
        <p className="text-muted-foreground">
          This is where you will find your group and teacher chats. <br />
          (Chat functionality coming soon)
        </p>
      </CardContent>
    </Card>
  );
}
