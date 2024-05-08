import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { useFindBookByNameQuery } from '../../services/booksApi';
import { selectRandomNumber } from '../../utils/selectors';

import style from './BookCardMini.module.css';

interface Props {
  bookName: string;
}

export const BookCardMini = ({ bookName }: Props) => {
  const { data, error, isLoading } = useFindBookByNameQuery(bookName);
  const randomNumber = useAppSelector(selectRandomNumber);

  const navigate = useNavigate();

  if (error) return <p>Error loading book.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;

  const noBookCover = '../../../public/NoBookCover.webp';

  const bookTitle = data[randomNumber]?.volumeInfo?.title || 'Untitled';
  const image =
    data[randomNumber]?.volumeInfo?.imageLinks?.thumbnail || noBookCover;
  const finishedImage: JSX.Element = (
    <div className={style.imageContainer}>
      <img src={image ?? noBookCover} alt={`Book = ${bookTitle}`} />
    </div>
  );
  const bookId = data[randomNumber]?.id || null;

  const handleClick = () => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div onClick={handleClick} className={style.card}>
      <p>{bookTitle}</p>
      {finishedImage}
    </div>
  );
};
