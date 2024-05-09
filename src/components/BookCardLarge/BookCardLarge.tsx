import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addFavorite,
  removeFavorite,
} from '../../features/featureAuthorization/AuthorizationSlice';
import { useGetBookByIdQuery } from '../../services/booksApi';
import { writeUserData, removeUserData } from '../../utils/getFirebaseData';
import { selectUser } from '../../utils/selectors';
import ToolTip from '../ToolTipComponent/ToolTip';

import style from './BookCardLarge.module.css';

export const BookCardLarge = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const { id } = useParams();
  const { data, error, isLoading } = useGetBookByIdQuery(id!);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const noBookCoverSource = '../../../public/NoBookCover.webp';
  const image =
    data?.imageLinks?.large ||
    data?.imageLinks?.medium ||
    data?.imageLinks?.small ||
    data?.imageLinks?.thumbnail ||
    noBookCoverSource;

  const authors = data?.authors?.join(', ') || 'Author not specified';
  const addedToFavorites = id ? user?.favorites.includes(id) : null;
  const text = addedToFavorites ? 'Remove from favorites' : 'Add to favorites';

  async function changeFavorites() {
    if (!user) {
      setVisible(false);
      return;
    }

    if (addedToFavorites && id) {
      dispatch(removeFavorite(id));
      await removeUserData(user.uid, id);
    } else if (id) {
      const updatedFavorites = [...user.favorites, id];
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
