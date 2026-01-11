'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { groups, teachers, students } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Send, Users, UserCog, PlusCircle, MoreVertical, LogOut, Paperclip, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';


const loggedInStudent = students.find(s => s.id === 'EB22210006139')!;
const myGroup = groups.find((g) => g.memberIds.includes(loggedInStudent.id))!;
const supervisor = teachers.find(t => t.id === myGroup?.supervisorId)!;

const initialConversations = [
    { id: myGroup.id, name: myGroup.name, type: 'group', members: myGroup.memberIds },
    { id: supervisor.id, name: supervisor.name, type: 'teacher' },
];

const initialMessages: { [key: string]: { id: string; senderId: string; text: string; timestamp: string }[]} = {
  [myGroup.id]: [
    { id: 'm1', senderId: 'EB22210006139', text: "Hey, I've pushed the initial schema design. Can you take a look?", timestamp: "09:30 AM" },
    { id: 'm2', senderId: 'EB22210006137', text: "Sure, checking it out now. Looks like a good start!", timestamp: "09:32 AM" },
    { id: 'm3', senderId: 'EB22210006139', text: "Great. Let me know if any changes are needed for the auth part.", timestamp: "09:33 AM" },
  ],
  [supervisor.id]: [
    { id: 's1', senderId: loggedInStudent.id, text: `Hello ${supervisor.name}, I have a question about the project proposal.`, timestamp: "Yesterday" }
  ]
};

export default function StudentChatPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversationId, setSelectedConversationId] = useState(myGroup.id);
  const [isCreateChatOpen, setIsCreateChatOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const { toast } = useToast();

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);
  const currentMessages = messages[selectedConversationId] || [];

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: `m${Date.now()}`,
      senderId: loggedInStudent.id,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => ({
        ...prev,
        [selectedConversationId]: [...(prev[selectedConversationId] || []), message]
    }));
    setNewMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleCreateChat = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const chatName = formData.get('chat-name') as string;
    const memberIds = students.filter(s => formData.get(s.id)).map(s => s.id);

    if (!chatName.trim() || memberIds.length === 0) {
        toast({ title: "Error", description: "Chat name and at least one member are required.", variant: 'destructive'});
        return;
    }
    
    const newChatId = `chat-${Date.now()}`;
    const newConversation: any = {
        id: newChatId,
        name: chatName,
        type: 'custom-group',
        members: [loggedInStudent.id, ...memberIds]
    };
    setConversations(prev => [newConversation, ...prev]);
    setMessages(prev => ({...prev, [newChatId]: []}));
    setSelectedConversationId(newChatId);
    setIsCreateChatOpen(false);
    toast({ title: "Chat Created!", description: `You started the "${chatName}" chat.`});
  }
  
  const handleAddMembers = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newMemberIds = students.filter(s => formData.get(s.id)).map(s => s.id);

    if (newMemberIds.length === 0) {
        toast({ title: "No members selected", description: "Please select at least one member to add.", variant: 'destructive'});
        return;
    }

    setConversations(prev => prev.map(c => {
        if (c.id === selectedConversationId) {
            return {
                ...c,
                members: Array.from(new Set([...(c.members || []), ...newMemberIds]))
            }
        }
        return c;
    }));

    setIsAddMemberOpen(false);
    toast({ title: "Members Added", description: `${newMemberIds.length} new member(s) have been added to the chat.` });
  }

  const handleLeaveChat = (chatId: string) => {
    setConversations(prev => prev.filter(c => c.id !== chatId));
    if (selectedConversationId === chatId) {
        setSelectedConversationId(myGroup.id);
    }
    toast({ title: "Chat Left", description: "You have left the conversation."});
  }

  const getConversationIcon = (type: string) => {
    switch (type) {
        case 'group': return <Users className="h-5 w-5" />;
        case 'teacher': return <UserCog className="h-5 w-5" />;
        case 'custom-group': return <Users className="h-5 w-5" />;
        default: return <Users className="h-5 w-5" />;
    }
  }

  const getAvatarUrl = (id: string, type: 'teacher' | 'student') => {
    let person;
    if (type === 'teacher') person = teachers.find(t => t.id === id);
    if (type === 'student') person = students.find(s => s.id === id);
    if (!person) return undefined;
    return PlaceHolderImages.find(p => p.id === person.avatar)?.imageUrl;
  }

  const otherStudentsInSystem = students.filter(s => s.id !== loggedInStudent.id);
  const membersInCurrentCustomChat = selectedConversation?.members || [];
  const studentsNotInCurrentChat = otherStudentsInSystem.filter(s => !membersInCurrentCustomChat.includes(s.id));


  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-4">
      <div className="col-span-1 flex flex-col border-r">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Conversations</h2>
          <Dialog open={isCreateChatOpen} onOpenChange={setIsCreateChatOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon"><PlusCircle className="h-5 w-5"/></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Group Chat</DialogTitle>
                    <DialogDescription>Create a temporary chat with other students.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateChat}>
                    <div className='space-y-4 py-4'>
                        <div className="space-y-2">
                            <Label htmlFor="chat-name">Chat Name</Label>
                            <Input id="chat-name" name="chat-name" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Select Members</Label>
                            <ScrollArea className="h-48 rounded-md border p-4">
                            {otherStudentsInSystem.map(student => (
                                <div key={student.id} className="flex items-center gap-3 mb-2">
                                    <Checkbox id={student.id} name={student.id} />
                                    <Label htmlFor={student.id} className="font-normal flex items-center gap-2">
                                         <Avatar className="h-8 w-8">
                                            <AvatarImage src={getAvatarUrl(student.id, 'student')} />
                                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {student.name}
                                    </Label>
                                </div>
                            ))}
                            </ScrollArea>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create Chat</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversationId(conv.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors',
                  conv.id === selectedConversationId ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
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
            <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">{getConversationIcon(selectedConversation.type)}</div>
                    <div>
                        <p className="font-semibold">{selectedConversation.name}</p>
                        {selectedConversation.type === 'group' && <p className="text-sm text-muted-foreground">{myGroup?.projectTitle}</p>}
                        {selectedConversation.type === 'custom-group' && <p className="text-sm text-muted-foreground">{selectedConversation.members?.length} members</p>}
                    </div>
                </div>
                 {selectedConversation.type === 'custom-group' && (
                    <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Add Member
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={() => handleLeaveChat(selectedConversationId)}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Leave Chat
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                         <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Members to "{selectedConversation.name}"</DialogTitle>
                                <DialogDescription>Select students to add to this chat.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddMembers}>
                                <div className="py-4">
                                <ScrollArea className="h-60 rounded-md border p-4">
                                {studentsNotInCurrentChat.length > 0 ? studentsNotInCurrentChat.map(student => (
                                    <div key={student.id} className="flex items-center gap-3 mb-2">
                                        <Checkbox id={`add-${student.id}`} name={student.id} />
                                        <Label htmlFor={`add-${student.id}`} className="font-normal flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={getAvatarUrl(student.id, 'student')} />
                                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            {student.name}
                                        </Label>
                                    </div>
                                )) : <p className="text-sm text-muted-foreground text-center">All students are already in this chat.</p>}
                                </ScrollArea>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Add to Chat</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
            <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
                {currentMessages.map((message) => {
                const convMembers = students.filter(s => selectedConversation.members?.includes(s.id));
                const sender = convMembers.find(m => m.id === message.senderId) || (message.senderId === supervisor.id ? supervisor : loggedInStudent);
                const senderAvatar = getAvatarUrl(sender.id, selectedConversation.type === 'teacher' ? 'teacher' : 'student');
                const isYou = message.senderId === loggedInStudent.id;
                return (
                <div
                    key={message.id}
                    className={cn( 'flex items-end gap-2', isYou && 'justify-end' )}
                >
                    {!isYou && sender && (
                    <Avatar className="h-8 w-8">
                        {senderAvatar && <AvatarImage src={senderAvatar} />}
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
                <Input 
                placeholder="Type your message..." 
                className="pr-24"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toast({ title: 'Feature not available', description: 'File sharing is not implemented in this demo.' })}
                    >
                        <Paperclip className="h-5 w-5 text-muted-foreground" />
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
