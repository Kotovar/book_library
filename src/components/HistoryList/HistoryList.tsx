import { Link } from 'react-router-dom';

import style from './HistoryList.module.css';

interface Props {
  history: string[];
  onDelete: (toAdd: boolean, history: string) => Promise<void>;
}

export const HistoryList = ({ history, onDelete }: Props) => {
  if (history.length === 0) {
    return <p className={style.p}>Search history is empty</p>;
  }

  return (
    <ul className={style.ul}>
      {history.map(query => (
        <div key={query} className={style.container}>
          <li className={style.li}>
            <Link to={`/search?${query}`}>{query}</Link>
          </li>
          <button
            title='Delete this search history'
            onClick={() => onDelete(false, query)}
          >
            X
          </button>
        </div>
      ))}
    </ul>
  );
};
