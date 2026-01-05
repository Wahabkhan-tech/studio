import type { Student, Teacher, Group, Task, Department, Session } from './types';

export const departments: Department[] = [
    { id: 'd1', name: 'Computer Science', head: 'Dr. Alan Grant' },
    { id: 'd2', name: 'Software Engineering', head: 'Dr. Ellie Sattler' },
    { id: 'd3', name: 'Information Technology', head: 'N/A' },
];

export const students: Student[] = [
  {
    id: 's1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: '1',
    status: 'ACTIVE',
    semester: 8,
    skills: ['React', 'Node.js', 'Firebase'],
    interests: 'Interested in building full-stack web applications with a focus on user experience.',
  },
  {
    id: 's2',
    name: 'Bob Williams',
    email: 'bob@example.com',
    avatar: '2',
    status: 'ACTIVE',
    semester: 8,
    skills: ['Python', 'Django', 'Machine Learning'],
    interests: 'Passionate about data science and applying machine learning models to real-world problems.',
  },
  {
    id: 's3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    avatar: '3',
    status: 'INACTIVE',
    semester: 8,
    skills: ['Java', 'Spring Boot', 'SQL'],
    interests: 'Loves backend development and database design.',
  },
  {
    id: 's4',
    name: 'Diana Prince',
    email: 'diana@example.com',
    avatar: '4',
    status: 'ACTIVE',
    semester: 8,
    skills: ['Figma', 'UI/UX Design', 'HTML/CSS'],
    interests: 'Focuses on creating intuitive and beautiful user interfaces.',
  },
   {
    id: 's5',
    name: 'Eve Adams',
    email: 'eve@example.com',
    avatar: '5',
    status: 'ACTIVE',
    semester: 8,
    skills: ['Flutter', 'Dart', 'Mobile Development'],
    interests: 'Excited about cross-platform mobile app development.',
  },
  {
    id: 's6',
    name: 'Frank Miller',
    email: 'frank@example.com',
    avatar: '6',
    status: 'ACTIVE',
    semester: 8,
    skills: ['DevOps', 'Docker', 'Kubernetes', 'AWS'],
    interests: 'Enjoys automating infrastructure and deployment pipelines.',
  }
];

export const teachers: Teacher[] = [
  {
    id: 't1',
    name: 'Dr. Alan Grant',
    email: 'alan.grant@example.com',
    avatar: '10',
    department: 'Computer Science',
    designation: 'Professor',
  },
  {
    id: 't2',
    name: 'Dr. Ellie Sattler',
    email: 'ellie.sattler@example.com',
    avatar: '11',
    department: 'Software Engineering',
    designation: 'Associate Professor',
  },
];

export const groups: Group[] = [
  {
    id: 'g1',
    name: 'AI Innovators',
    projectTitle: 'Real-time Emotion Detection',
    status: 'ACTIVE',
    leaderId: 's2',
    memberIds: ['s2', 's4'],
    supervisorId: 't1',
    proposal: {
      title: 'Real-time Emotion Detection from Video Streams',
      description: 'A project to build a system that detects human emotions in real-time using webcam feeds and deep learning models.',
      techStack: ['Python', 'TensorFlow', 'OpenCV'],
      status: 'APPROVED',
      feedback: "Great progress on the initial model training. The accuracy is promising. For next week, please focus on preparing the dataset for the next phase and document the model architecture clearly."
    },
    progress: 75,
    description: 'Developing a cutting-edge emotion detection system using AI.',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'React'],
  },
  {
    id: 'g2',
    name: 'Web Wizards',
    projectTitle: 'E-commerce Platform for Local Artisans',
    status: 'PENDING',
    leaderId: 's1',
    memberIds: ['s1', 's5'],
    supervisorId: 't2',
    proposal: {
      title: 'E-commerce Platform for Local Artisans',
      description: 'A full-featured e-commerce website to help local artisans sell their products online.',
      techStack: ['React', 'Node.js', 'PostgreSQL'],
      status: 'PENDING',
    },
    progress: 10,
    description: 'Building a feature-rich e-commerce site from scratch.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
  },
  {
    id: 'g3',
    name: 'Cloud Commanders',
    projectTitle: 'Serverless Data Processing Pipeline',
    status: 'COMPLETED',
    leaderId: 's6',
    memberIds: ['s6', 's3'],
    supervisorId: 't1',
    proposal: {
      title: 'Serverless Data Processing Pipeline on AWS',
      description: 'Implementing a scalable and cost-effective data processing pipeline using AWS Lambda, S3, and DynamoDB.',
      techStack: ['AWS', 'Python', 'Terraform'],
      status: 'APPROVED',
    },
    progress: 100,
    description: 'Exploring the power of serverless architecture for big data.',
    techStack: ['AWS Lambda', 'Python', 'S3', 'DynamoDB'],
  },
];

export const tasks: Task[] = [
  { id: 'task-1', title: 'Setup project boilerplate', assignedTo: 's1', status: 'Done', dueDate: '2024-06-10' },
  { id: 'task-2', title: 'Design database schema', assignedTo: 's5', status: 'In Progress', dueDate: '2024-06-15' },
  { id: 'task-3', title: 'Develop authentication API', assignedTo: 's1', status: 'To Do', dueDate: '2024-06-20' },
  { id: 'task-4', title: 'Create UI mockups for dashboard', assignedTo: 's4', status: 'Done', dueDate: '2024-06-05' },
  { id: 'task-5', title: 'Train initial ML model', assignedTo: 's2', status: 'In Progress', dueDate: '2024-06-18' },
];

export const sessions: Session[] = [
    { id: 'ses1', title: 'Weekly Sync', groupId: 'g1', date: '2024-07-25', attendees: ['s2', 's4'] },
    { id: 'ses2', title: 'Proposal Discussion', groupId: 'g2', date: '2024-07-26', attendees: ['s1'] },
    { id: 'ses3', title: 'Initial Kick-off', groupId: 'g1', date: '2024-07-18', attendees: ['s2', 's4'] },
    { id: 'ses4', title: 'Mid-Project Review', groupId: 'g1', date: '2024-08-01', attendees: ['s4'] },
]
