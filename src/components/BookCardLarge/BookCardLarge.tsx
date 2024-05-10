import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { useGetBookByIdQuery } from '../../services/booksApi';
import { selectUser } from '../../utils/selectors';
import { useChangeFavorites } from '../../utils/useChangeFavorites';
import ToolTip from '../ToolTipComponent/ToolTip';

import style from './BookCardLarge.module.css';

export const BookCardLarge = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const { id } = useParams();
  const bookId = id || '';
  const { data, error, isLoading } = useGetBookByIdQuery(bookId);
  const user = useAppSelector(selectUser);
  const changeFavorites = useChangeFavorites();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!visible) {
      timer = setTimeout(() => {
        setVisible(true);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [visible]);

  const noBookCoverSource = '../../../public/NoBookCover.webp';
  const image =
    data?.imageLinks?.large ||
    data?.imageLinks?.medium ||
    data?.imageLinks?.small ||
    data?.imageLinks?.thumbnail ||
    noBookCoverSource;

  const authors = data?.authors?.join(', ') || 'Author not specified';
  const addedToFavorites = id ? user?.favorites.includes(id) ?? false : false;
  const text = addedToFavorites ? 'Remove from favorites' : 'Add to favorites';

  const handleMainClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'BUTTON') {
      setVisible(true);
    }
  };

  const handleFavoriteClick = () => {
    if (!user) {
      setVisible(false);
      return;
    }
    if (id) {
      changeFavorites(id, addedToFavorites);
    }
  };

  if (error) return <p>Error loading book.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;

  return (
    <main onClick={handleMainClick}>
      <div className={style.container}>
        <h1>{data.title ?? 'No name'}</h1>
        <p>{data.description ?? 'No description'}</p>
        <p>{authors}</p>
        <p>{`Language: ${data.language}`}</p>
        <p>{`Pages: ${data.pageCount}`}</p>
        <div className={style['image-container']}>
          <img src={image} alt={`${data.title} cover`} />
        </div>

        <ToolTip visible={visible}>
          <button onClick={handleFavoriteClick}>{text}</button>
        </ToolTip>
      </div>
    </main>
  );
};
