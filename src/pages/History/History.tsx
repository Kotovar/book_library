import { useOutletContext } from 'react-router-dom';

import { HistoryList } from '../../components/HistoryList/HistoryList';
import { useChangeHistory } from '../../utils/useChangeHistory';
import { useGetHistory } from '../../utils/useGetHistory';

import style from './History.module.css';

export const History = () => {
  const changeHistory = useChangeHistory();
  const userHistory = useGetHistory();
  const theme: 'light' | 'dark' = useOutletContext();
  const mainClass = theme === 'light' ? style.light : style.dark;

  return (
    <main className={`${mainClass}`}>
      <h1>History</h1>
      <HistoryList history={userHistory} onDelete={changeHistory} />
    </main>
  );
};
