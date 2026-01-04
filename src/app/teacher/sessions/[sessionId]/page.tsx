import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { students } from "@/lib/data";

export default function LiveSessionPage({ params }: { params: { sessionId: string } }) {
  const participants = students.slice(0, 3); // Demo participants

  return (
    <div className="grid md:grid-cols-4 gap-4 h-[calc(100vh-10rem)]">
      <div className="md:col-span-3 bg-muted rounded-lg flex items-center justify-center relative">
        <div className="grid grid-cols-2 gap-4">
           {participants.map(p => {
             const avatar = PlaceHolderImages.find(img => img.id === p.avatar);
             return (
                <div key={p.id} className="bg-background rounded-lg p-2 aspect-video flex flex-col justify-between">
                    <div className="flex-grow flex items-center justify-center">
                        <Avatar className="h-24 w-24">
                            {avatar && <AvatarImage src={avatar.imageUrl} />}
                            <AvatarFallback>{p.name[0]}</AvatarFallback>
                        </Avatar>
                    </div>
                    <p className="text-sm text-center font-medium">{p.name}</p>
                </div>
             )
           })}
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card p-2 rounded-lg shadow-lg flex gap-2">
            <Button variant="outline" size="icon"><Mic className="h-5 w-5" /></Button>
            <Button variant="outline" size="icon"><Video className="h-5 w-5" /></Button>
            <Button variant="destructive" size="icon"><PhoneOff className="h-5 w-5" /></Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Card className="flex-grow flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5"/> Session Chat</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center text-muted-foreground">
            <p>Chat coming soon</p>
          </CardContent>
        </Card>
        <Card className="flex-grow flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/> Participants ({participants.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
             {participants.map(p => (
                 <div key={p.id} className="flex items-center justify-between">
                    <span className="text-sm">{p.name}</span>
                    <MicOff className="h-4 w-4 text-muted-foreground" />
                 </div>
             ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
