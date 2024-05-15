import PropTypes from 'prop-types';

import { useGetBookByIdQuery } from '../../features/featureBooksApi/booksApi';
import { getBookDetailsLite } from '../../utils/getBookDetails';
import { useBookDetails } from '../../utils/useBookDetails';
import { useChangeFavorites } from '../../utils/useChangeFavorites';
import { useHandleNavigateClick } from '../../utils/useHandleNavigateClick';
import { FetchStatus } from '../FetchStatus/FetchStatus';

import style from './BookCardMini.module.css';

interface Props {
  bookId: string;
}

export const BookCardMiniFavorite = ({ bookId }: Props) => {
  const { data, error, isLoading } = useGetBookByIdQuery(bookId);
  const { addedToFavorites } = useBookDetails(bookId);
  const handleClick = useHandleNavigateClick();
  const changeFavorites = useChangeFavorites();

  const handleFavoriteClick = async () => {
    await changeFavorites(bookId);
  };

  const { buttonText, buttonTitle, imageUrl, title } = getBookDetailsLite(
    data,
    addedToFavorites
  );

  const finishedImage: JSX.Element = (
    <div onClick={e => handleClick(e, bookId)} className={style.imageContainer}>
      <img src={imageUrl} alt={`Book = ${title}`} />
    </div>
  );

  return (
    <FetchStatus isLoading={isLoading} error={error} data={data}>
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
    </FetchStatus>
  );
};

BookCardMiniFavorite.propTypes = {
  bookId: PropTypes.string,
};
