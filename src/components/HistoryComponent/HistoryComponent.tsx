import { useAppSelector } from '../../app/hooks';
import type { User } from '../../types/types';
import { selectUser } from '../../utils/selectors';
import { useChangeHistory } from '../../utils/useChangeHistory';
import { HistoryList } from '../HistoryList/HistoryList';

export const History = () => {
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
