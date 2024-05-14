import { useAppSelector } from '../../app/hooks';
import { HistoryList } from '../../components/HistoryList/HistoryList';
import { selectUser } from '../../utils/selectors';
import { useChangeHistory } from '../../utils/useChangeHistory';

export const History = () => {
  const user = useAppSelector(selectUser);
  const changeHistory = useChangeHistory();
  const userHistory = user?.history ?? [];

  return (
    <main>
      <h1>History</h1>
      <HistoryList history={userHistory} onDelete={changeHistory} />
    </main>
  );
};
