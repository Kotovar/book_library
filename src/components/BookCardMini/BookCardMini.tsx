import { useOutletContext } from 'react-router-dom';

import type { VolumeInfo } from '../../types/types';
import {
  useBookDetails,
  useChangeFavorites,
  useHandleNavigateClick,
  getBookDetailsLite,
} from '../../utils';

import style from './BookCardMini.module.css';

interface Props {
  id: string;
  volumeInfo: VolumeInfo;
}

export const BookCardMini = ({ id, volumeInfo }: Props) => {
  const handleClick = useHandleNavigateClick();
  const changeFavorites = useChangeFavorites();
  const { addedToFavorites } = useBookDetails(id);
  const theme: 'light' | 'dark' = useOutletContext();
  const cardClass = theme === 'light' ? style.light : style.dark;

  const handleFavoriteClick = () => {
    changeFavorites(id);
  };

  const { buttonText, buttonTitle, imageUrl, title } = getBookDetailsLite(
    volumeInfo,
    addedToFavorites
  );

  const finishedImage: JSX.Element = (
    <button onClick={e => handleClick(e, id)} className={style.imageContainer}>
      <img src={imageUrl} alt={`Book = ${title}`} />
    </button>
  );

  return (
    <div className={`${style.card} ${cardClass}`}>
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
