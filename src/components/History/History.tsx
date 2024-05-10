import { Link } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import type { User } from '../../types/types';
import { selectUser } from '../../utils/selectors';
import { useChangeHistory } from '../../utils/useChangeHistory';

import style from './History.module.css';
export const History = () => {
  const user = useAppSelector(selectUser) as User;
  const changeHistory = useChangeHistory();

  const userHistory = user?.history || [];
  let listSearch = <p className={style.p}>Search history is empty</p>;

  if (userHistory.length > 0) {
    listSearch = (
      <ul className={style.ul}>
        {userHistory.map(query => (
          <div key={query} className={style.container}>
            <li className={style.li}>
              <Link to={`/search?${query}`}>{query}</Link>
            </li>
            <button
              title='Delete this search history'
              onClick={() => changeHistory(user, false, query)}
            >
              X
            </button>
          </div>
        ))}
      </ul>
    );
  }

  return (
    <main>
      <h1>History</h1>
      {listSearch}
    </main>
  );
};
