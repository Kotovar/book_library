import { useOutletContext } from 'react-router-dom';

import { BookCardMiniFavorite } from '../../components/BookCardMini/BookCardMiniFavorite';
import { useGetFavorites } from '../../utils';

import style from './Favorites.module.css';

const Favorites = () => {
  const userFavorites = useGetFavorites();
  const theme: 'light' | 'dark' = useOutletContext();
  const mainClass = theme === 'light' ? style.light : style.dark;

  let listBooks = (
    <p className={style.p}>You don't have any books in your favorites</p>
  );

  if (userFavorites.length > 0) {
    listBooks = (
      <ul className={style.ul}>
        {userFavorites.map(book => (
          <li key={book} className={style.li}>
            <BookCardMiniFavorite bookId={book} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main className={mainClass}>
      <h1 className={style.h1}>Favorites</h1>
      {listBooks}
    </main>
  );
};

export default Favorites;
