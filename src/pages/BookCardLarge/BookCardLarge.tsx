import { useOutletContext, useParams } from 'react-router-dom';

import { FetchStatus } from '../../components/FetchStatus/FetchStatus';
import { ToolTip } from '../../components/ToolTipComponent/ToolTip';
import { useGetBookByIdQuery } from '../../features/featureBooksApi/booksApi';
import {
  getBookDetailsFull,
  useBookDetails,
  useChangeFavorites,
  useVisibilityTimer,
} from '../../utils';

import style from './BookCardLarge.module.css';

const BookCardLarge = () => {
  const { id = '' } = useParams();
  const { data, error, isLoading } = useGetBookByIdQuery(id);
  const { user, addedToFavorites } = useBookDetails(id);
  const [visible, setVisible] = useVisibilityTimer();
  const changeFavorites = useChangeFavorites();
  const theme: 'light' | 'dark' = useOutletContext();

  const mainClass = theme === 'light' ? style.light : style.dark;
  const containerClass =
    theme === 'light' ? style.containerLight : style.containerDark;

  const handleFavoriteClick = () => {
    if (!user) {
      setVisible(false);
      return;
    }
    changeFavorites(id);
  };

  const { imageUrl, authors, text, title, description, language, pages } =
    getBookDetailsFull(data, addedToFavorites);

  return (
    <FetchStatus isLoading={isLoading} error={error} data={data} theme={theme}>
      <main className={mainClass}>
        <div className={`${style.container} ${containerClass}`}>
          <div className={style.main}>
            <div className={style.imageContainer}>
              <img src={imageUrl} alt={`${title} cover`} />
            </div>
            <div className={style.descriptionContainer}>
              <h1>{title}</h1>
              <p>{authors}</p>
              <p>{language}</p>
              <p>{pages}</p>
            </div>
          </div>

          <p>{description}</p>

          <ToolTip visible={visible}>
            <button
              className={style.button}
              onClick={handleFavoriteClick}
              aria-label='Add to favorites'
            >
              {text}
            </button>
          </ToolTip>
        </div>
      </main>
    </FetchStatus>
  );
};

export default BookCardLarge;