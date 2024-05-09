import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../utils/selectors';
import { BookCardMiniFavorite } from '../BookCardMini/BookCardMiniFavorite';

import style from './Favorites.module.css';

export const Favorites = () => {
  const user = useAppSelector(selectUser);
  const listFavoriteBooks = user?.favorites || [];
  let listBooks = (
    <p className={style.p}>You don't have any books in your favorites</p>
  );

  if (listFavoriteBooks.length > 0) {
    listBooks = (
      <ul className={style.ul}>
        {listFavoriteBooks.map(book => (
          <li key={book} className={style.li}>
            <BookCardMiniFavorite bookId={book} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main>
      <h1>Favorites</h1>
      {listBooks}
    </main>
  );
};
