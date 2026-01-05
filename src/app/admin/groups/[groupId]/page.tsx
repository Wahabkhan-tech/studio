
import { GroupDetailsPage } from '@/components/group-details-page';
import { groups, students, teachers } from '@/lib/data';

export default function AdminGroupDetails({ params }: { params: { groupId: string } }) {
  const group = groups.find(g => g.id === params.groupId);
  if (!group) {
    return <div>Group not found</div>;
  }
  const supervisor = teachers.find(t => t.id === group.supervisorId);
  const members = students.filter(s => group.memberIds.includes(s.id));

  return (
    <GroupDetailsPage
      role="admin"
      group={group}
      supervisor={supervisor}
      members={members}
    />
  );
}
