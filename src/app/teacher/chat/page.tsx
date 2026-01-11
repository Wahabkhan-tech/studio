'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { groups, teachers, students } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Search, Send, Users, Shield, Paperclip, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const loggedInTeacher = teachers[0];
const myGroups = groups.filter((g) => g.supervisorId === loggedInTeacher.id);

const initialConversations = [
  { id: 'admin-chat', name: 'Admin', type: 'admin' },
  ...myGroups.map((g) => ({ id: g.id, name: g.name, type: 'group' })),
];

const initialMessages: {
  [key: string]: {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    attachment?: { name: string; type: string };
  }[];
} = {
  'admin-chat': [
    {
      id: 'admin-m1',
      senderId: 'admin',
      text: 'Please ensure all group proposals are reviewed by the end of the week.',
      timestamp: '10:30 AM',
    },
  ],
  [myGroups[0]?.id || 'G02']: [
    {
      id: 'm1',
      senderId: 'EB22210006025',
      text: "Sir Mukesh, we've completed the data collection phase. Ready to move on to model training.",
      timestamp: '11:00 AM',
    },
    {
      id: 'm2',
      senderId: 'T01',
      text: 'Excellent work. Please prepare a summary of the dataset and your proposed model architecture.',
      timestamp: '11:05 AM',
    },
    {
      id: 'm3',
      senderId: 'EB22210006055',
      text: "I've updated the UI mockups based on our last discussion.",
      timestamp: '11:10 AM',
    },
  ],
};

export default function TeacherChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversationId, setSelectedConversationId] = useState(
    initialConversations[1]?.id || 'G02'
  );
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const selectedConversation = initialConversations.find(
    (c) => c.id === selectedConversationId
  );
  const currentMessages = messages[selectedConversationId] || [];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachedFile(event.target.files[0]);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '' && !attachedFile) return;

    const message: any = {
      id: `m${Date.now()}`,
      senderId: loggedInTeacher.id,
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
      case 'group':
        return <Users className="h-5 w-5" />;
      case 'admin':
        return <Shield className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  const getAvatarUrl = (id: string) => {
    const student = students.find((s) => s.id === id);
    if (!student) return undefined;
    return PlaceHolderImages.find((p) => p.id === student.avatar)?.imageUrl;
  };

  const selectedGroup =
    selectedConversation?.type === 'group'
      ? myGroups.find((g) => g.id === selectedConversation.id)
      : null;

  const selectedGroupMembers = selectedGroup
    ? students.filter((s) => selectedGroup.memberIds.includes(s.id))
    : [];

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
            {initialConversations.map((conv) => (
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
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {getConversationIcon(conv.type)}
                </div>
                <p className="font-semibold">{conv.name}</p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="col-span-3 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="flex items-center gap-4 border-b p-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="h-10 w-10 rounded-full bg-muted flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
                    disabled={selectedConversation.type !== 'group'}
                  >
                    {getConversationIcon(selectedConversation.type)}
                  </button>
                </DialogTrigger>
                {selectedGroup && (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Members of {selectedGroup.name}</DialogTitle>
                      <DialogDescription>
                        {selectedGroup.projectTitle}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      {selectedGroupMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={getAvatarUrl(member.id)} />
                            <AvatarFallback>
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                )}
              </Dialog>
              <div>
                <p className="font-semibold">{selectedConversation.name}</p>
                {selectedConversation.type === 'group' && (
                  <p className="text-sm text-muted-foreground">
                    {
                      myGroups.find((g) => g.id === selectedConversation.id)
                        ?.projectTitle
                    }
                  </p>
                )}
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {currentMessages.map((message) => {
                  const groupMembers =
                    selectedConversation.type === 'group'
                      ? students.filter((s) =>
                          myGroups
                            .find((g) => g.id === selectedConversationId)
                            ?.memberIds.includes(s.id)
                        )
                      : [];
                  const sender =
                    message.senderId === loggedInTeacher.id
                      ? loggedInTeacher
                      : groupMembers.find((m) => m.id === message.senderId) || {
                          name: 'Admin',
                          id: 'admin',
                          avatar: '',
                        };
                  const senderAvatar = getAvatarUrl(sender.id);
                  const isYou = message.senderId === loggedInTeacher.id;
                  return (
                    <div
                      key={message.id}
                      className={cn(
                        'flex items-end gap-2',
                        isYou && 'justify-end'
                      )}
                    >
                      {!isYou && sender && (
                        <Avatar className="h-8 w-8">
                          {senderAvatar && <AvatarImage src={senderAvatar} />}
                          <AvatarFallback>
                            {sender.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          'max-w-xs rounded-lg p-3 md:max-w-md',
                          isYou
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                      >
                         {!isYou && (
                          <p className="text-xs font-semibold mb-1">
                            {sender?.name}
                          </p>
                        )}
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
                  );
                })}
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
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleSendMessage}
                  >
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
