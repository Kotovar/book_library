import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { useGetBookByIdQuery } from '../../services/booksApi';
import { selectUser } from '../../utils/selectors';
import { useChangeFavorites } from '../../utils/useChangeFavorites';

import style from './BookCardMini.module.css';

interface Props {
  bookId: string;
}

export const BookCardMiniFavorite = ({ bookId }: Props) => {
  const { data, error, isLoading } = useGetBookByIdQuery(bookId);

  const navigate = useNavigate();
  const changeFavorites = useChangeFavorites();
  const user = useAppSelector(selectUser);

  if (error) return <p>Error loading book.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'BUTTON') {
      navigate(`/book/${bookId}`);
    }
  };

  const handleFavoriteClick = () => {
    if (!user) {
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
  const bookTitle = data.title || 'Untitled';

  const image = data?.imageLinks?.thumbnail || noBookCover;
  const finishedImage: JSX.Element = (
    <div onClick={handleClick} className={style.imageContainer}>
      <img src={image ?? noBookCover} alt={`Book = ${bookTitle}`} />
    </div>
  );

  return (
    <div className={style.card}>
      <p>{bookTitle}</p>
      {finishedImage}
      <button
        title={buttonTitle}
        className={style.button}
        onClick={handleFavoriteClick}
      >
        {buttonText}
      </button>
    </div>
  );
};
