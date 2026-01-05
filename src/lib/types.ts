
export type Student = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'ACTIVE' | 'INACTIVE';
  semester: number;
  skills: string[];
  interests: string;
  groupPreferences?: string;
  profileStatus?: "INCOMPLETE" | "PENDING_APPROVAL" | "COMPLETE";
};

export type Teacher = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  designation: string;
};

export type Department = {
    id: string;
    name: string;
    head: string;
}

export type Group = {
  id: string;
  name: string;
  projectTitle: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED';
  leaderId: string;
  memberIds: string[];
  supervisorId: string;
  proposal: {
    title: string;
    description: string;
    techStack: string[];
    pdfUrl?: string;
    status: 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED';
    feedback?: string;
  };
  progress: number;
  description: string;
  techStack: string[];
};

export type UserRole = 'admin' | 'teacher' | 'student';

export type Task = {
  id: string;
  title: string;
  assignedTo: string;
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate: string;
};

export type Session = {
    id: string;
    title: string;
    groupId: string;
    date: string;
    attendees: string[];
}
