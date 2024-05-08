import { useState } from 'react';

import { getDatabase, ref, set, child, get } from 'firebase/database';
import { useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addFavorite,
  removeFavorite,
  getError,
} from '../../features/featureAuthorization/AuthorizationSlice';
import { useGetBookByIdQuery } from '../../services/booksApi';
import { selectUser } from '../../utils/selectors';
import ToolTip from '../ToolTipComponent/ToolTip';

import style from './BookCardLarge.module.css';

export const BookCardLarge = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const { id } = useParams();
  const { data, error, isLoading } = useGetBookByIdQuery(id!);
  const dispatch = useAppDispatch();

  const noBookCover = '../../../public/NoBookCover.webp';
  const image =
    data?.imageLinks?.large ||
    data?.imageLinks?.medium ||
    data?.imageLinks?.small ||
    data?.imageLinks?.thumbnail ||
    noBookCover;
  const authors = data?.authors?.join(', ') || 'Author not specified';

  const user = useAppSelector(selectUser);
  const addedToFavorites = id ? user?.favorites.includes(id) : null;
  const text = isLoading
    ? '...'
    : addedToFavorites
      ? 'Remove from favorites'
      : 'Add to favorites';

  function writeUserData(userId: string, favorite: string[]) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      favorites: favorite,
    });
  }

  function removeUserData(userId: string, bookId: string) {
    const db = getDatabase();
    const dbRef = ref(db);

    get(child(dbRef, `users/${userId}`))
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val().favorites;

          const updatedFavorite = data.filter(
            (book: string) => book !== bookId
          );

          set(ref(db, 'users/' + userId), {
            favorites: updatedFavorite,
          });
        } else {
          dispatch(getError('No data available'));
        }
      })
      .catch(error => {
        dispatch(getError(error));
      });
  }

  function changeFavorites() {
    if (!user) {
      setVisible(false);
      return;
    }

    if (addedToFavorites && id) {
      dispatch(removeFavorite(id));
      removeUserData(user.uid, id);
    } else {
      const updatedFavorites = [...user.favorites, id!];

      dispatch(addFavorite(updatedFavorites));
      writeUserData(user.uid, updatedFavorites);
    }
  }

  if (error) return <p>Error loading book.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;

  return (
    <main>
      <div className={style.container}>
        <h1>{data.title ?? 'No name'}</h1>
        <p>{data.subtitle ?? 'No description'}</p>
        <p>{authors}</p>
        <p>{`Language: ${data.language}`}</p>
        <p>{`Pages: ${data.pageCount}`}</p>
        <div className={style['image-container']}>
          <img src={image} alt={`${data.title} cover`} />
        </div>

        <ToolTip visible={visible}>
          <button onClick={changeFavorites}>{text}</button>
        </ToolTip>
      </div>
    </main>
  );
};
