import { useAppSelector } from '../../app/hooks';
import { BookCardMiniFavorite } from '../../components/BookCardMini/BookCardMiniFavorite';
import { selectUser } from '../../utils/selectors';

import style from './Favorites.module.css';

const Favorites = () => {
  const user = useAppSelector(selectUser);
  const userFavorites = user?.favorites || [];

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
    <main>
      <h1>Favorites</h1>
      {listBooks}
    </main>
  );
};

export default Favorites;
