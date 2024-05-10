import { Link } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../utils/selectors';
import { useChangeHistory } from '../../utils/useChangeHistory';

import style from './History.module.css';
export const History = () => {
  const user = useAppSelector(selectUser);
  const changeHistory = useChangeHistory();

  const userHistory = user?.history || [];
  let listSearch = <p className={style.p}>Search history is empty</p>;

  const deleteQuery = (query: string) => {
    if (user) {
      changeHistory(user, false, query);
    }
  };

  if (userHistory.length > 0) {
    listSearch = (
      <ul className={style.ul}>
        {userHistory.map(query => (
          <div className={style.container}>
            <li key={query} className={style.li}>
              <Link to={`/search?${query}`}>{query}</Link>
            </li>
            <button onClick={() => deleteQuery(query)}>X</button>
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
