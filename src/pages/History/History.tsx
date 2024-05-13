import { useAppSelector } from '../../app/hooks';
import { HistoryList } from '../../components/HistoryList/HistoryList';
import type { User } from '../../types/types';
import { selectUser } from '../../utils/selectors';
import { useChangeHistory } from '../../utils/useChangeHistory';

const History = () => {
  const user = useAppSelector(selectUser) as User;
  const changeHistory = useChangeHistory();
  const userHistory = user?.history ?? [];

  return (
    <main>
      <h1>History</h1>
      <HistoryList history={userHistory} onDelete={changeHistory} />
    </main>
  );
};

export default History;
