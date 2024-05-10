import { useAppSelector } from '../../app/hooks';
import { useGetBookByIdQuery } from '../../features/featureBooksApi/booksApi';
import { selectUser } from '../../utils/selectors';
import { useChangeFavorites } from '../../utils/useChangeFavorites';
import { useHandleClick } from '../../utils/useHandleClick';

import style from './BookCardMini.module.css';

interface Props {
  bookId: string;
}

export const BookCardMiniFavorite = ({ bookId }: Props) => {
  const { data, error, isLoading } = useGetBookByIdQuery(bookId);
  const handleClick = useHandleClick();
  const changeFavorites = useChangeFavorites();
  const user = useAppSelector(selectUser);

  if (error) return <p>Error loading book.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;

  const handleFavoriteClick = () => {
    if (!user) {
      return;
    }
    if (bookId) {
      changeFavorites(user, bookId, addedToFavorites);
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
    <div onClick={e => handleClick(e, bookId)} className={style.imageContainer}>
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
