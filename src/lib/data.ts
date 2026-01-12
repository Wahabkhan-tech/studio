
import type { Student, Teacher, Group, Task, Department, Session, Notification } from './types';

export const departments: Department[] = [
  { id: 'cs', name: 'Computer Science', head: 'Sir Mukesh' },
];

export const teachers: Teacher[] = [
  {
    id: 'T01',
    name: 'Sir Mukesh',
    email: 'mukesh@protracks.com',
    avatar: '10',
    department: 'Computer Science',
    designation: 'Professor',
  },
  {
    id: 'T02',
    name: 'Sir Nadeem',
    email: 'nadeem@protracks.com',
    avatar: '11',
    department: 'Computer Science',
    designation: 'Associate Professor',
  },
];

const allGroupsRaw = [
  {
    "groupId": "G01",
    "groupName": "Group 1",
    "teacher": "Sir Mukesh",
    "students": [
      { "name": "Yasir", "seatNo": "EB22210006139", "email": "eb22210006139@bscs4b.edu.pk" },
      { "name": "Nasr", "seatNo": "EB22210006137", "email": "eb22210006137@bscs4b.edu.pk" },
      { "name": "Umer", "seatNo": "EB22210006061", "email": "eb22210006061@bscs4b.edu.pk" },
      { "name": "Mujtaba", "seatNo": "EB22210006127", "email": "eb22210006127@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G02",
    "groupName": "Group 2",
    "teacher": "Sir Mukesh",
    "students": [
      { "name": "Arish", "seatNo": "EB22210006025", "email": "eb22210006025@bscs4b.edu.pk" },
      { "name": "Sameer Inayat Ali", "seatNo": "EB22210006117", "email": "eb22210006117@bscs4b.edu.pk" },
      { "name": "Kamran Ayub", "seatNo": "EB22210006055", "email": "eb22210006055@bscs4b.edu.pk" },
      { "name": "Ahmad Mustafa", "seatNo": "EB22210006012", "email": "eb22210006012@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G03",
    "groupName": "Group 3",
    "teacher": "Sir Mukesh",
    "students": [
      { "name": "Abdul Moiz", "seatNo": "EB22210006003", "email": "eb22210006003@bscs4b.edu.pk" },
      { "name": "Muhtashum Ahmed", "seatNo": "EB22210006107", "email": "eb22210006107@bscs4b.edu.pk" },
      { "name": "Abdul Ahad", "seatNo": "EB22210006001", "email": "eb22210006001@bscs4b.edu.pk" },
      { "name": "Mohammad Azeem Islam", "seatNo": "EB22210006074", "email": "eb22210006074@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G04",
    "groupName": "Group 4",
    "teacher": "Sir Mukesh",
    "students": [
      { "name": "Sunair Anwar", "seatNo": "EB21102108", "email": "eb21102108@bscs4b.edu.pk" },
      { "name": "Muhammad Taha Khan", "seatNo": "EB21102083", "email": "eb21102083@bscs4b.edu.pk" },
      { "name": "Muhammad Umer Siddiqui", "seatNo": "EB22210006104", "email": "eb22210006104@bscs4b.edu.pk" },
      { "name": "Saad Saifullah", "seatNo": "EB21102094", "email": "eb21102094@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G05",
    "groupName": "Group 5",
    "teacher": "Sir Mukesh",
    "students": [
      { "name": "Muhammad Affan", "seatNo": "EB22210006067", "email": "eb22210006067@bscs4b.edu.pk" },
      { "name": "Daniyal Rehman", "seatNo": "EB22210006035", "email": "eb22210006035@bscs4b.edu.pk" },
      { "name": "Muhammad Asad", "seatNo": "EB22210006071", "email": "eb22210006071@bscs4b.edu.pk" },
      { "name": "Taha Khan", "seatNo": "EB22210006143", "email": "eb22210006143@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G06",
    "groupName": "Group 6",
    "teacher": "Sir Nadeem",
    "students": [
      { "name": "Syed Ebad Hussain", "seatNo": "EB22210006131", "email": "eb22210006131@bscs4b.edu.pk" },
      { "name": "Muhammad Abdullah Qazi", "seatNo": "EB22210006063", "email": "eb22210006063@bscs4b.edu.pk" },
      { "name": "Muhammad Daud Siddiqui", "seatNo": "EB22210006076", "email": "eb22210006076@bscs4b.edu.pk" },
      { "name": "Muhammad Khizar Khalil", "seatNo": "EB22210006086", "email": "eb22210006086@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G07",
    "groupName": "Group 7",
    "teacher": "Sir Nadeem",
    "students": [
      { "name": "Muhammad Talha Idris", "seatNo": "EB22210006102", "email": "eb22210006102@bscs4b.edu.pk" },
      { "name": "Sharmeen Zahid", "seatNo": "EB22210006121", "email": "eb22210006121@bscs4b.edu.pk" },
      { "name": "Maryam", "seatNo": "EB22210006059", "email": "eb22210006059@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G08",
    "groupName": "Group 8",
    "teacher": "Sir Nadeem",
    "students": [
      { "name": "Shaheer Ansari", "seatNo": "EB22210006096", "email": "eb22210006096@bscs4b.edu.pk" },
      { "name": "Mohammad Rahim", "seatNo": "EB22210006092", "email": "eb22210006092@bscs4b.edu.pk" },
      { "name": "Syed Ammar Ali", "seatNo": "EB22210006129", "email": "eb22210006129@bscs4b.edu.pk" },
      { "name": "Jagdish Das", "seatNo": "EB22210006051", "email": "eb22210006051@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G09",
    "groupName": "Group 9",
    "teacher": "Sir Nadeem",
    "students": [
      { "name": "Muhammad Taha", "seatNo": "EB22210006100", "email": "eb22210006100@bscs4b.edu.pk" },
      { "name": "Qazi Wajahat Zubair", "seatNo": "EB22210006111", "email": "eb22210006111@bscs4b.edu.pk" },
      { "name": "Alishba Adil", "seatNo": "EB22210006017", "email": "eb22210006017@bscs4b.edu.pk" },
      { "name": "Jaweria Akram", "seatNo": "EB22210006053", "email": "eb22210006053@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G10",
    "groupName": "Group 10",
    "teacher": "Sir Nadeem",
    "students": [
      { "name": "Syed Omer Iqbal", "seatNo": "EB22210006138", "email": "eb22210006138@bscs4b.edu.pk" },
      { "name": "Hassan Shahid", "seatNo": "EB22210006047", "email": "eb22210006047@bscs4b.edu.pk" },
      { "name": "Syed Muhammad Hamza", "seatNo": "EB22210006133", "email": "eb22210006133@bscs4b.edu.pk" },
      { "name": "Subhan Ali", "seatNo": "EB22210006125", "email": "eb22210006125@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G11",
    "groupName": "Group 11",
    "teacher": "Sir Mukesh",
    "students": [
      { "name": "Muhammad Hamza", "seatNo": "EB22210006080", "email": "eb22210006080@bscs4b.edu.pk" },
      { "name": "Muhammad Mubashir Wasi", "seatNo": "EB22210006088", "email": "eb22210006088@bscs4b.edu.pk" },
      { "name": "Muhammad Zohair Altaf", "seatNo": "EB22210006106", "email": "eb22210006106@bscs4b.edu.pk" },
      { "name": "Muhammad Sufyan Farid", "seatNo": "EB22210006098", "email": "eb22210006098@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G12",
    "groupName": "Group 12",
    "teacher": "Sir Mukesh",
    "students": [
      { "name": "Ishtiaq Ahmed", "seatNo": "EB22210006049", "email": "eb22210006049@bscs4b.edu.pk" },
      { "name": "Syed Zubair Ahmed", "seatNo": "EB22210006142", "email": "eb22210006142@bscs4b.edu.pk" },
      { "name": "Muhammad Faheem", "seatNo": "EB22210006078", "email": "eb22210006078@bscs4b.edu.pk" },
      { "name": "Muhammad Ibraheem Khan", "seatNo": "EB22210006084", "email": "eb22210006084@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G13",
    "groupName": "Group 13",
    "teacher": "Sir Mukesh",
    "students": [
      { "name": "Saifullah Akram", "seatNo": "EB22210006115", "email": "eb22210006115@bscs4b.edu.pk" },
      { "name": "Muhammad Mustafa Mubashir", "seatNo": "EB22210006090", "email": "eb22210006090@bscs4b.edu.pk" },
      { "name": "Muhammad Anas Sajjad", "seatNo": "EB22210006070", "email": "eb22210006070@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G14",
    "groupName": "Group 14",
    "teacher": "Sir Mukesh",
    "students": [
      { "name": "Abdul Wasay Khan", "seatNo": "EB22210006007", "email": "eb22210006007@bscs4b.edu.pk" },
      { "name": "Muhammad Safwan", "seatNo": "EB22210006094", "email": "eb22210006094@bscs4b.edu.pk" },
      { "name": "Areeb Rehman", "seatNo": "EB22210006023", "email": "eb22210006023@bscs4b.edu.pk" },
      { "name": "Shafiq ur Rehman", "seatNo": "EB22210006119", "email": "eb22210006119@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G15",
    "groupName": "Group 15",
    "teacher": "Sir Mukesh",
    "students": [
      { "name": "Uzair Waheed", "seatNo": "EB22210006147", "email": "eb22210006147@bscs4b.edu.pk" },
      { "name": "Hafiz Muhammad Talha", "seatNo": "EB22210006039", "email": "eb22210006039@bscs4b.edu.pk" },
      { "name": "Ammara Khan", "seatNo": "EB22210006019", "email": "eb22210006019@bscs4b.edu.pk" },
      { "name": "Laraib Khan", "seatNo": "EB22210006057", "email": "eb22210006057@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G16",
    "groupName": "Group 16",
    "teacher": "Sir Nadeem",
    "students": [
      { "name": "Bismah Manaal", "seatNo": "EB22210006031", "email": "eb22210006031@bscs4b.edu.pk" },
      { "name": "Hafsa Noor", "seatNo": "EB22210006041", "email": "eb22210006041@bscs4b.edu.pk" },
      { "name": "Bisma Imran", "seatNo": "EB22210006029", "email": "eb22210006029@bscs4b.edu.pk" },
      { "name": "Eman Naseer", "seatNo": "EB22210006037", "email": "eb22210006037@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G17",
    "groupName": "Group 17",
    "teacher": "Sir Nadeem",
    "students": [
      { "name": "Arham Sharif", "seatNo": "EB21102022", "email": "eb21102022@bscs4b.edu.pk" },
      { "name": "Abu Zahoor Qasmi", "seatNo": "EB22210006065", "email": "eb22210006065@bscs4b.edu.pk" },
      { "name": "Ansar Ullah Siddiqui", "seatNo": "EB22210006021", "email": "eb22210006021@bscs4b.edu.pk" },
      { "name": "Zohaib Manzoor", "seatNo": "EB22210006149", "email": "eb22210006149@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G18",
    "groupName": "Group 18",
    "teacher": "Sir Nadeem",
    "students": [
      { "name": "Abdul Wahab", "seatNo": "EB22210006005", "email": "eb22210006005@bscs4b.edu.pk" },
      { "name": "Aimal Tashfain", "seatNo": "EB22210006015", "email": "eb22210006015@bscs4b.edu.pk" },
      { "name": "Anher Siddiqui", "seatNo": "EB22210006020", "email": "eb22210006020@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G19",
    "groupName": "Group 19",
    "teacher": "Sir Nadeem",
    "students": [
      { "name": "Basit Ahmed", "seatNo": "EB22210006027", "email": "eb22210006027@bscs4b.edu.pk" },
      { "name": "Hanzalah Haider", "seatNo": "EB22210006043", "email": "eb22210006043@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G20",
    "groupName": "Group 20",
    "teacher": "Sir Nadeem",
    "students": [
      { "name": "Muneeb", "seatNo": "EB22210006135", "email": "eb22210006135@bscs4b.edu.pk" },
      { "name": "Haseeb", "seatNo": "EB22210006082", "email": "eb22210006082@bscs4b.edu.pk" },
      { "name": "Hassan Ahmed", "seatNo": "EB22210006045", "email": "eb22210006045@bscs4b.edu.pk" }
    ]
  },
  {
    "groupId": "G21",
    "groupName": "Group 21",
    "teacher": "Sir Nadeem",
    "students": [
      { "name": "Syed Muslim Raza", "seatNo": "EB21102119", "email": "eb21102119@bscs4b.edu.pk" },
      { "name": "Syed Askari Zaidi", "seatNo": "EB21102115", "email": "eb21102115@bscs4b.edu.pk" },
      { "name": "Shifa Haseen", "seatNo": "EB21102106", "email": "eb21102106@bscs4b.edu.pk" },
      { "name": "Syed Sumair Hussain", "seatNo": "EB21102123", "email": "eb21102123@bscs4b.edu.pk" }
    ]
  }
];

export const students: Student[] = allGroupsRaw.flatMap((group, gIndex) =>
  group.students.map((student, sIndex) => ({
    id: student.seatNo,
    name: student.name,
    email: student.email,
    registrationNumber: student.seatNo,
    avatar: `${gIndex + 1}${sIndex + 1}`,
    status: 'ACTIVE',
    semester: 8,
    skills: ['React', 'Node.js', 'Firebase'],
    interests: 'Interested in building full-stack web applications.',
    department: 'Computer Science',
    class: 'BSCS',
    section: 'A',
    session: '2024',
  }))
);

export const groups: Group[] = allGroupsRaw.map((group, index) => {
  const supervisor = teachers.find(t => t.name === group.teacher);
  const memberIds = group.students.map(s => s.seatNo);
  const projectTitle = `FYP Title for ${group.groupName}`;
  const description = `This is the project description for ${projectTitle}. It involves complex problem-solving and innovative technology.`;
  const techStack = ['React', 'Next.js', 'Tailwind CSS'];
  // Deterministic progress based on index to avoid hydration errors
  const progress = (index * 5 + 10) % 100;
  const proposalStatusValue = index % 4 === 0 ? 'PENDING' : 'APPROVED';

  return {
    id: group.groupId,
    name: group.groupName,
    projectTitle: projectTitle,
    status: progress === 100 ? 'COMPLETED' : progress > 10 ? 'ACTIVE' : 'PENDING',
    leaderId: memberIds[0],
    memberIds: memberIds,
    supervisorId: supervisor?.id || 'T01',
    proposal: {
      title: projectTitle,
      description: `This is a detailed proposal for ${projectTitle}. It outlines the project's objectives, scope, and deliverables.`,
      techStack: techStack,
      status: proposalStatusValue,
      feedback: proposalStatusValue === 'APPROVED' ? 'The proposal is well-structured and the project is approved. Please proceed with the implementation.' : undefined,
    },
    progress: progress,
    description: description,
    techStack: techStack,
    evaluationHistory: [
      {
        comment: 'Great progress on the initial model training. The accuracy is promising.',
        progress: 25,
        date: '2024-07-15'
      },
      {
        comment: 'The frontend UI is looking clean, but we need to work on the responsiveness for mobile devices.',
        progress: 15,
        date: '2024-07-08'
      }
    ],
  };
});

export const tasks: Task[] = [
    { id: 'task-1', title: 'Setup project boilerplate', assignedTo: 'EB22210006139', status: 'Done', dueDate: '2024-06-10' },
    { id: 'task-2', title: 'Design database schema', assignedTo: 'EB22210006137', status: 'In Progress', dueDate: '2024-06-15' },
    { id: 'task-3', title: 'Develop authentication API', assignedTo: 'EB22210006139', status: 'To Do', dueDate: '2024-06-20' },
    { id: 'task-4', title: 'Create UI mockups for dashboard', assignedTo: 'EB22210006025', status: 'Done', dueDate: '2024-06-05' },
    { id: 'task-5', title: 'Train initial ML model', assignedTo: 'EB22210006117', status: 'In Progress', dueDate: '2024-06-18' },
];

export const sessions: Session[] = [
    { id: 'ses1', title: 'Weekly Sync', groupId: 'G01', date: '2024-07-25', attendees: ['EB22210006139', 'EB22210006137'] },
    { id: 'ses2', title: 'Proposal Discussion', groupId: 'G02', date: '2024-07-26', attendees: ['EB22210006025'] },
    { id: 'ses3', title: 'Initial Kick-off', groupId: 'G01', date: '2024-07-18', attendees: ['EB22210006139', 'EB22210006137', 'EB22210006061', 'EB22210006127'] },
    { id: 'ses4', title: 'Mid-Project Review', groupId: 'G06', date: '2024-08-01', attendees: ['EB22210006131'] },
];

export const notifications: { [key in 'admin' | 'teacher' | 'student']: Notification[] } = {
  student: [
    { id: 'n1', text: 'Your proposal for "Group 1" has been approved!', time: '2 hours ago', unread: true },
    { id: 'n2', text: 'Sir Mukesh scheduled a new session: "Weekly Sync".', time: '1 day ago', unread: true },
    { id: 'n3', text: 'A new task "Implement Authentication" was assigned to you.', time: '3 days ago', unread: false },
  ],
  teacher: [
    { id: 'n4', text: '"Group 4" has submitted their project proposal for review.', time: '5 minutes ago', unread: true },
    { id: 'n5', text: 'You have a new message from the Admin.', time: '1 hour ago', unread: false },
    { id: 'n6', text: 'Attendance for "Group 2" is pending for yesterday\'s session.', time: '1 day ago', unread: false },
  ],
  admin: [
    { id: 'n7', text: 'A new student "Ahmad Mustafa" has registered.', time: '15 minutes ago', unread: true },
    { id: 'n8', text: 'Sir Nadeem created a new group: "Group 21".', time: '2 hours ago', unread: false },
    { id: 'n9', text: 'The final project submission deadline is approaching.', time: '5 days ago', unread: false },
  ],
};
