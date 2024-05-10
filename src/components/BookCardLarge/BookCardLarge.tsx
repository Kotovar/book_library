import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { useGetBookByIdQuery } from '../../features/featureBooksApi/booksApi';
import { getBookDetailsFull } from '../../utils/getBookDetails';
import { makeSelectIsFavorite, selectUser } from '../../utils/selectors';
import { useChangeFavorites } from '../../utils/useChangeFavorites';
import { useVisibilityTimer } from '../../utils/useVisibilityTimer';
import ToolTip from '../ToolTipComponent/ToolTip';

import style from './BookCardLarge.module.css';

export const BookCardLarge = () => {
  const { id } = useParams() as { id: string };
  const { data, error, isLoading } = useGetBookByIdQuery(id);
  const user = useAppSelector(selectUser);
  const addedToFavorites = useAppSelector(makeSelectIsFavorite(id));
  const changeFavorites = useChangeFavorites();
  const [visible, setVisible] = useVisibilityTimer();

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

  if (error) return <p className={style.p}>Error loading book.</p>;
  if (isLoading) return <p className={style.p}>Loading...</p>;

  const bookDetails = data ? getBookDetailsFull(data, addedToFavorites) : null;

  if (!bookDetails) return null;

  const { image, authors, text, title, description, language, pages } =
    bookDetails;

  return (
    <main onClick={handleMainClick}>
      <div className={style.container}>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{authors}</p>
        <p>{language}</p>
        <p>{pages}</p>
        <div className={style['image-container']}>
          <img src={image} alt={`${title} cover`} />
        </div>

        <ToolTip visible={visible}>
          <button onClick={handleFavoriteClick}>{text}</button>
        </ToolTip>
      </div>
    </main>
  );
};
