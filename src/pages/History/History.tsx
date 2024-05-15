import { HistoryList } from '../../components/HistoryList/HistoryList';
import { useChangeHistory } from '../../utils/useChangeHistory';
import { useGetHistory } from '../../utils/useGetHistory';

export const History = () => {
  const changeHistory = useChangeHistory();
  const userHistory = useGetHistory();

  return (
    <main>
      <h1>History</h1>
      <HistoryList history={userHistory} onDelete={changeHistory} />
    </main>
  );
};
