import { useAppSelector } from '../../app/hooks';
import { useGetBookByIdQuery } from '../../features/featureBooksApi/booksApi';
import { getBookDetailsLite } from '../../utils/getBookDetails';
import { makeSelectIsFavorite } from '../../utils/selectors';
import { useChangeFavorites } from '../../utils/useChangeFavorites';
import { useHandleNavigateClick } from '../../utils/useHandleNavigateClick';

import style from './BookCardMini.module.css';

interface Props {
  bookId: string;
}

export const BookCardMiniFavorite = ({ bookId }: Props) => {
  const { data, error, isLoading } = useGetBookByIdQuery(bookId);
  const handleClick = useHandleNavigateClick();
  const changeFavorites = useChangeFavorites();
  const addedToFavorites = useAppSelector(makeSelectIsFavorite(bookId));

  if (error) return <p>Error loading book.</p>;
  if (isLoading) return <p>Loading...</p>;

  if (!data) return null;

  const handleFavoriteClick = async () => {
    await changeFavorites(bookId, addedToFavorites);
  };

  const bookDetails = data ? getBookDetailsLite(data, addedToFavorites) : null;

  if (!bookDetails) return null;

  const { buttonText, buttonTitle, image, title } = bookDetails;

  const finishedImage: JSX.Element = (
    <div onClick={e => handleClick(e, bookId)} className={style.imageContainer}>
      <img src={image} alt={`Book = ${title}`} />
    </div>
  );

  return (
    <div className={style.card}>
      <p>{title}</p>
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
