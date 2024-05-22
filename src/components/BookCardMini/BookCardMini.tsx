import { useOutletContext } from 'react-router-dom';

import type { VolumeInfo } from '../../types/types';
import { getBookDetailsLite } from '../../utils/getBookDetails';
import { useBookDetails } from '../../utils/useBookDetails';
import { useChangeFavorites } from '../../utils/useChangeFavorites';
import { useHandleNavigateClick } from '../../utils/useHandleNavigateClick';
import { useVisibilityTimer } from '../../utils/useVisibilityTimer';
import { ToolTip } from '../ToolTipComponent/ToolTip';

import style from './BookCardMini.module.css';

interface Props {
  id: string;
  volumeInfo: VolumeInfo;
}

export const BookCardMini = ({ id, volumeInfo }: Props) => {
  const handleClick = useHandleNavigateClick();
  const changeFavorites = useChangeFavorites();
  const { user, addedToFavorites } = useBookDetails(id);
  const [visible, setVisible] = useVisibilityTimer();
  const theme: 'light' | 'dark' = useOutletContext();
  const cardClass = theme === 'light' ? style.light : style.dark;

  const handleFavoriteClick = () => {
    if (!user) {
      setVisible(false);
      return;
    }

    changeFavorites(id);
  };

  const { buttonText, buttonTitle, imageUrl, title } = getBookDetailsLite(
    volumeInfo,
    addedToFavorites
  );

  const finishedImage: JSX.Element = (
    <div onClick={e => handleClick(e, id)} className={style.imageContainer}>
      <img src={imageUrl} alt={`Book = ${title}`} />
    </div>
  );

  return (
    <div className={`${style.card} ${cardClass}`}>
      <p>{title}</p>
      {finishedImage}
      <ToolTip visible={visible}>
        <button
          title={buttonTitle}
          className={style.button}
          onClick={handleFavoriteClick}
        >
          {buttonText}
        </button>
      </ToolTip>
    </div>
  );
};
