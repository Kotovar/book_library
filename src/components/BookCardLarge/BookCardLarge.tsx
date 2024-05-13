import { useParams } from 'react-router-dom';

import { useGetBookByIdQuery } from '../../features/featureBooksApi/booksApi';
import { getBookDetailsFull } from '../../utils/getBookDetails';
import { useBookDetails } from '../../utils/useBookDetails';
import { useChangeFavorites } from '../../utils/useChangeFavorites';
import { useVisibilityTimer } from '../../utils/useVisibilityTimer';
import { FetchStatus } from '../FetchStatus/FetchStatus';
import ToolTip from '../ToolTipComponent/ToolTip';

import style from './BookCardLarge.module.css';

export const BookCardLarge = () => {
  const { id } = useParams() as { id: string };
  const { data, error, isLoading } = useGetBookByIdQuery(id);
  const { user, addedToFavorites } = useBookDetails(id);
  const changeFavorites = useChangeFavorites();
  const [visible, setVisible] = useVisibilityTimer();

  const handleFavoriteClick = () => {
    if (!user) {
      setVisible(false);
      return;
    }
    changeFavorites(id);
  };

  const bookDetails = data ? getBookDetailsFull(data, addedToFavorites) : null;

  if (!bookDetails) return null;

  const { image, authors, text, title, description, language, pages } =
    bookDetails;

  return (
    <FetchStatus isLoading={isLoading} error={error} data={data}>
      <main>
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
    </FetchStatus>
  );
};
