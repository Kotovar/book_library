import { useParams } from 'react-router-dom';

import { useGetBookByIdQuery } from '../../features/featureBooksApi/booksApi';
import { getBookDetailsFull } from '../../utils/getBookDetails';
import { useBookDetails } from '../../utils/useBookDetails';
import { useChangeFavorites } from '../../utils/useChangeFavorites';
import { useVisibilityTimer } from '../../utils/useVisibilityTimer';
import { FetchStatus } from '../FetchStatus/FetchStatus';
import { ToolTip } from '../ToolTipComponent/ToolTip';

import style from './BookCardLarge.module.css';

const BookCardLarge = () => {
  const { id = '' } = useParams();
  const { data, error, isLoading } = useGetBookByIdQuery(id);
  const { user, addedToFavorites } = useBookDetails(id);
  const [visible, setVisible] = useVisibilityTimer();
  const changeFavorites = useChangeFavorites();

  const handleFavoriteClick = () => {
    if (!user) {
      setVisible(false);
      return;
    }
    changeFavorites(id);
  };

  const { image, authors, text, title, description, language, pages } =
    getBookDetailsFull(data, addedToFavorites);

  return (
    <FetchStatus isLoading={isLoading} error={error} data={data}>
      <main>
        <div className={style.container}>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{authors}</p>
          <p>{language}</p>
          <p>{pages}</p>
          <div className={style.imageContainer}>
            <img src={image} alt={`${title} cover`} />
          </div>

          <ToolTip visible={visible}>
            <button onClick={handleFavoriteClick} aria-label='Add to favorites'>
              {text}
            </button>
          </ToolTip>
        </div>
      </main>
    </FetchStatus>
  );
};

export default BookCardLarge;
