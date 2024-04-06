import { memo } from 'react';
import { useGetActivityLog } from '../../api/activityLogApi';

interface ActivityLogProps {
  id: number;
}

const ActivityLog = memo((props: ActivityLogProps) => {
  const { id } = props;
  const { isLoading, data } = useGetActivityLog(id);

  return (
    <div>
      <div />
    </div>
  );
});

export default ActivityLog;
