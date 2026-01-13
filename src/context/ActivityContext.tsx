'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { formatDistanceToNow } from 'date-fns';

type ActivityType = 'teacher' | 'student' | 'group' | 'proposal' | 'system' | 'department';

interface Activity {
  id: string;
  message: string;
  timestamp: string;
  isoTime: string;
  type: ActivityType;
}

interface ActivityContextType {
  activities: Activity[];
  addActivity: (message: string, type: ActivityType) => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useState<Activity[]>(() => {
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const savedActivities = window.localStorage.getItem('system-activities');
        return savedActivities ? JSON.parse(savedActivities) : [];
    } catch (error) {
        console.error('Failed to parse activities from localStorage', error);
        return [];
    }
  });

  useEffect(() => {
    try {
        window.localStorage.setItem('system-activities', JSON.stringify(activities));
    } catch (error) {
        console.error('Failed to save activities to localStorage', error);
    }
  }, [activities]);

  const addActivity = (message: string, type: ActivityType) => {
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      message,
      isoTime: new Date().toISOString(),
      timestamp: formatDistanceToNow(new Date(), { addSuffix: true }),
      type,
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 20)); // Keep only latest 20
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};
