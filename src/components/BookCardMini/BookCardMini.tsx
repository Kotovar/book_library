import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { useFindBookByNameQuery } from '../../services/booksApi';
import { selectRandomNumber, selectUser } from '../../utils/selectors';
import { useChangeFavorites } from '../../utils/useChangeFavorites';
import ToolTip from '../ToolTipComponent/ToolTip';

import style from './BookCardMini.module.css';

interface Props {
  bookName: string;
}

export const BookCardMini = ({ bookName }: Props) => {
  const { data, error, isLoading } = useFindBookByNameQuery(bookName);
  const randomNumber = useAppSelector(selectRandomNumber);
  const [visible, setVisible] = useState<boolean>(true);
  const navigate = useNavigate();
  const changeFavorites = useChangeFavorites();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!visible) {
      timer = setTimeout(() => {
        setVisible(true);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [visible]);

  if (error) return <p>Error loading book.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;

  const bookId = data[randomNumber]?.id || null;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'BUTTON') {
      navigate(`/book/${bookId}`);
    }
  };

  const handleFavoriteClick = () => {
    if (!user) {
      setVisible(false);
      return;
    }
    if (bookId) {
      changeFavorites(bookId, addedToFavorites);
    }
  };

  const addedToFavorites = bookId
    ? user?.favorites.includes(bookId) ?? false
    : false;

  const buttonText = addedToFavorites ? '♥' : '♡';
  const buttonTitle = addedToFavorites
    ? 'Remove from favorites'
    : 'Add to favorites';
  const noBookCover = '../../../public/NoBookCover.webp';
  const bookTitle = data[randomNumber]?.volumeInfo?.title || 'Untitled';

  const image =
    data[randomNumber]?.volumeInfo?.imageLinks?.thumbnail || noBookCover;
  const finishedImage: JSX.Element = (
    <div onClick={handleClick} className={style.imageContainer}>
      <img src={image ?? noBookCover} alt={`Book = ${bookTitle}`} />
    </div>
  );

  return (
    <div className={style.card}>
      <p>{bookTitle}</p>
      {finishedImage}
      <ToolTip visible={visible}>
        <button
          title={buttonTitle}
          className={style.button}
          onClick={handleFavoriteClick}
        >
          {buttonText}
        </button>
      </ToolTip>
    </div>
  );
};
