import { GroupDetailsPage } from '@/components/group-details-page';
import { groups, students, teachers } from '@/lib/data';

export default function StudentGroupDetails({ params }: { params: { groupId: string } }) {
  const group = groups.find(g => g.id === params.groupId);
  if (!group) {
    return <div>Group not found</div>;
  }
  const supervisor = teachers.find(t => t.id === group.supervisorId);
  const members = students.filter(s => group.memberIds.includes(s.id));

  return (
    <GroupDetailsPage
      role="student"
      group={group}
      supervisor={supervisor}
      members={members}
    />
  );
}
