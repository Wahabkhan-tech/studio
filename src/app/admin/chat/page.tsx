'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { teachers } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Search, Send, Users, UserCog, Paperclip, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialConversations = [
  { id: 'all-teachers', name: 'All Teachers', type: 'broadcast-teacher' },
  { id: 'all-students', name: 'All Students', type: 'broadcast-student' },
  ...teachers.map((t) => ({ id: t.id, name: t.name, type: 'teacher' })),
];

const initialMessages: {
  [key: string]: {
    id: string;
    sender: string;
    text: string;
    timestamp: string;
    attachment?: { name: string; type: string };
  }[];
} = {
  'all-teachers': [
    {
      id: 'm1',
      sender: 'You',
      text: 'Reminder: Please submit all final grades by Friday.',
      timestamp: '10:00 AM',
    },
  ],
  'all-students': [],
  [teachers[0].id]: [
    {
      id: 't1-m1',
      sender: 'You',
      text: 'Hello Dr. Grant, could you please review the new project guidelines?',
      timestamp: '10:00 AM',
    },
    {
      id: 't1-m2',
      sender: 'Dr. Alan Grant',
      text: 'Of course. I will take a look this afternoon.',
      timestamp: '10:02 AM',
    },
  ],
};

export default function AdminChatPage() {
  const [conversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversationId, setSelectedConversationId] = useState(
    initialConversations[0].id
  );
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );
  const currentMessages = messages[selectedConversationId] || [];

  let avatarUrl: string | undefined;
  if (selectedConversation?.type === 'teacher') {
    const teacher = teachers.find((t) => t.id === selectedConversationId);
    avatarUrl = PlaceHolderImages.find((p) => p.id === teacher?.avatar)
      ?.imageUrl;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachedFile(event.target.files[0]);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '' && !attachedFile) return;

    const message: any = {
      id: `m${Date.now()}`,
      sender: 'You',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    if (attachedFile) {
        message.attachment = { name: attachedFile.name, type: attachedFile.type };
        toast({
            title: "File attached (simulation)",
            description: `"${attachedFile.name}" would be sent with your message.`,
        });
    }

    setMessages((prev) => ({
      ...prev,
      [selectedConversationId]: [
        ...(prev[selectedConversationId] || []),
        message,
      ],
    }));
    setNewMessage('');
    setAttachedFile(null);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getConversationIcon = (type: string) => {
    switch (type) {
      case 'broadcast-teacher':
        return <UserCog className="h-5 w-5" />;
      case 'broadcast-student':
        return <Users className="h-5 w-5" />;
      case 'teacher':
        return <UserCog className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-4">
      <div className="col-span-1 flex flex-col border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold">Conversations</h2>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {conversations.map((conv) => {
              const teacher =
                conv.type === 'teacher'
                  ? teachers.find((t) => t.id === conv.id)
                  : null;
              const convAvatar = teacher
                ? PlaceHolderImages.find((p) => p.id === teacher.avatar)
                : null;
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversationId(conv.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors',
                    conv.id === selectedConversationId
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted'
                  )}
                >
                  <Avatar className="h-10 w-10">
                    {convAvatar && <AvatarImage src={convAvatar.imageUrl} />}
                    <AvatarFallback>
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        {getConversationIcon(conv.type)}
                      </div>
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{conv.name}</p>
                    {teacher && (
                      <p className="text-xs text-muted-foreground">
                        {teacher.department}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
      <div className="col-span-3 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="flex items-center gap-4 border-b p-4">
              <Avatar className="h-10 w-10">
                {avatarUrl && <AvatarImage src={avatarUrl} />}
                <AvatarFallback>
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    {getConversationIcon(selectedConversation.type)}
                  </div>
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{selectedConversation.name}</p>
                <p className="text-sm text-muted-foreground">
                  System-Wide Communication
                </p>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex items-end gap-2',
                      message.sender === 'You' && 'justify-end'
                    )}
                  >
                    {message.sender !== 'You' &&
                      selectedConversation.type === 'teacher' && (
                        <Avatar className="h-8 w-8">
                          {avatarUrl && <AvatarImage src={avatarUrl} />}
                          <AvatarFallback>
                            {message.sender.charAt(0)}
                          </AvatarFallback>
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
                      {message.attachment && (
                          <div className="mb-2 p-2 bg-black/10 rounded-md">
                            <p className="text-sm font-medium flex items-center gap-2">
                              <Paperclip className="h-4 w-4" />
                              {message.attachment.name}
                            </p>
                          </div>
                        )}
                      <p className="text-sm">{message.text}</p>
                      <p className="mt-1 text-right text-xs opacity-70">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t p-4 space-y-2">
               {attachedFile && (
                <div className="p-2 border rounded-md flex items-center justify-between bg-muted/50">
                    <div className="flex items-center gap-2 text-sm">
                        <Paperclip className="h-4 w-4" />
                        <span className="truncate max-w-xs">{attachedFile.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setAttachedFile(null)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
              )}
              <div className="relative">
                <Input
                  placeholder="Type your message..."
                  className="pr-24"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
                  <Button size="icon" variant="ghost" asChild>
                     <label htmlFor="file-upload" className="cursor-pointer">
                        <Paperclip className="h-5 w-5 text-muted-foreground" />
                        <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                    </label>
                  </Button>
                  <Button size="icon" variant="ghost" onClick={handleSendMessage}>
                    <Send className="h-5 w-5 text-primary" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            <p>Select a conversation to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}
