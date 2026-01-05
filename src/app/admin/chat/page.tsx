
'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { teachers } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Search, Send } from 'lucide-react';

export default function AdminChatPage() {
  // Demo data
  const selectedTeacher = teachers[0];
  const avatar = PlaceHolderImages.find((p) => p.id === selectedTeacher.avatar);
  const messages = [
    {
      id: 'm1',
      sender: 'You',
      text: 'Hello Dr. Grant, could you please review the new project guidelines?',
      timestamp: '10:00 AM',
    },
    {
      id: 'm2',
      sender: selectedTeacher.name,
      text: 'Of course. I will take a look this afternoon.',
      timestamp: '10:02 AM',
    },
  ];

  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-4">
      <div className="col-span-1 flex flex-col border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold">Conversations</h2>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search teachers..." className="pl-8" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {teachers.map((teacher) => {
              const teacherAvatar = PlaceHolderImages.find(
                (p) => p.id === teacher.avatar
              );
              return (
                <button
                  key={teacher.id}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors',
                    teacher.id === selectedTeacher.id
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted'
                  )}
                >
                  <Avatar className="h-10 w-10">
                    {teacherAvatar && (
                      <AvatarImage src={teacherAvatar.imageUrl} />
                    )}
                    <AvatarFallback>
                      {teacher.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{teacher.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {teacher.department}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
      <div className="col-span-3 flex flex-col">
        <div className="flex items-center gap-4 border-b p-4">
          <Avatar className="h-10 w-10">
            {avatar && <AvatarImage src={avatar.imageUrl} />}
            <AvatarFallback>{selectedTeacher.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{selectedTeacher.name}</p>
            <p className="text-sm text-muted-foreground">System-Wide Communication</p>
          </div>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-end gap-2',
                  message.sender === 'You' && 'justify-end'
                )}
              >
                {message.sender !== 'You' && (
                  <Avatar className="h-8 w-8">
                     {avatar && <AvatarImage src={avatar.imageUrl} />}
                    <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs rounded-lg p-3 md:max-w-md',
                    message.sender === 'You'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="mt-1 text-right text-xs opacity-70">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
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
