
'use client';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { notifications as allNotifications } from '@/lib/data';
import type { UserRole, Notification as NotificationType } from '@/lib/types';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

interface NotificationsProps {
  role: UserRole;
}

export function Notifications({ role }: NotificationsProps) {
  const notifications: NotificationType[] = allNotifications[role] || [];
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary/90"></span>
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 font-medium border-b">
          Notifications
        </div>
        <ScrollArea className="h-96">
            <div className="p-2">
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <div key={notification.id} className={cn("p-2 rounded-lg flex items-start gap-3 text-sm", notification.unread && "bg-primary/5")}>
                        {notification.unread && <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0"></div>}
                        <div className={cn(!notification.unread && "pl-5")}>
                            <p>{notification.text}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-muted-foreground p-8">
                    No new notifications.
                </div>
            )}
            </div>
        </ScrollArea>
        <div className="p-2 border-t text-center">
            <Button variant="link" size="sm" className="text-xs">
                View all notifications
            </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
