
'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { groups, teachers, students } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Search, Send, Users, Shield } from 'lucide-react';

export default function TeacherChatPage() {
  const myGroups = groups.filter((g) => g.supervisorId === 't1');
  const loggedInTeacher = teachers[0];

  const conversations = [
    { id: 'conv-admin', name: 'Admin', type: 'admin' },
    ...myGroups.map(g => ({ id: g.id, name: g.name, type: 'group' }))
  ];

  const selectedConversationId = 'g1'; // AI Innovators
  const selectedGroup = myGroups.find(g => g.id === selectedConversationId);
  const groupMembers = students.filter(s => selectedGroup?.memberIds.includes(s.id));

  const messages = [
     { id: 'm1', senderId: 's2', text: "Dr. Grant, we've completed the data collection phase. Ready to move on to model training.", timestamp: "11:00 AM" },
     { id: 'm2', senderId: 't1', text: "Excellent work. Please prepare a summary of the dataset and your proposed model architecture.", timestamp: "11:05 AM" },
     { id: 'm3', senderId: 's4', text: "I've updated the UI mockups based on our last discussion.", timestamp: "11:10 AM" },
  ];

  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-4">
      <div className="col-span-1 flex flex-col border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold">Conversations</h2>
           <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search groups..." className="pl-8" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors',
                   conv.id === selectedConversationId ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                )}
              >
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    {conv.type === 'group' && <Users className="h-5 w-5" />}
                    {conv.type === 'admin' && <Shield className="h-5 w-5" />}
                </div>
                <p className="font-semibold">{conv.name}</p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="col-span-3 flex flex-col">
        <div className="flex items-center gap-4 border-b p-4">
           <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center"><Users className="h-5 w-5" /></div>
          <div>
            <p className="font-semibold">{selectedGroup?.name}</p>
            <p className="text-sm text-muted-foreground">{selectedGroup?.projectTitle}</p>
          </div>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => {
               const sender = message.senderId === loggedInTeacher.id ? loggedInTeacher : groupMembers.find(m => m.id === message.senderId);
               const senderAvatar = PlaceHolderImages.find(p => p.id === sender?.avatar);
               const isYou = message.senderId === loggedInTeacher.id;
              return (
              <div
                key={message.id}
                className={cn( 'flex items-end gap-2', isYou && 'justify-end' )}
              >
                {!isYou && sender && (
                  <Avatar className="h-8 w-8">
                     {senderAvatar && <AvatarImage src={senderAvatar.imageUrl} />}
                    <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs rounded-lg p-3 md:max-w-md',
                    isYou ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}
                >
                  {!isYou && <p className="text-xs font-semibold mb-1">{sender?.name}</p>}
                  <p className="text-sm">{message.text}</p>
                  <p className="mt-1 text-right text-xs opacity-70">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            )})}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="relative">
            <Input placeholder="Type your message..." className="pr-12" />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <Send className="h-5 w-5 text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
