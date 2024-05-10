import { useAppSelector } from '../../app/hooks';
import type { VolumeInfo } from '../../types/types';
import { getBookDetailsLite } from '../../utils/getBookDetails';
import { selectUser } from '../../utils/selectors';
import { makeSelectIsFavorite } from '../../utils/selectors';
import { useChangeFavorites } from '../../utils/useChangeFavorites';
import { useHandleNavigateClick } from '../../utils/useHandleNavigateClick';
import { useVisibilityTimer } from '../../utils/useVisibilityTimer';
import ToolTip from '../ToolTipComponent/ToolTip';

import style from './BookCardMini.module.css';

interface Props {
  id: string;
  volumeInfo: VolumeInfo;
}

export const BookCardMini = ({ id, volumeInfo }: Props) => {
  const handleClick = useHandleNavigateClick();
  const changeFavorites = useChangeFavorites();
  const user = useAppSelector(selectUser);
  const addedToFavorites = useAppSelector(makeSelectIsFavorite(id));
  const [visible, setVisible] = useVisibilityTimer();

  const handleFavoriteClick = () => {
    if (!user) {
      setVisible(false);
      return;
    }

    changeFavorites(id, addedToFavorites);
  };

  const { buttonText, buttonTitle, image, title } = getBookDetailsLite(
    volumeInfo,
    addedToFavorites
  );

  const finishedImage: JSX.Element = (
    <div onClick={e => handleClick(e, id)} className={style.imageContainer}>
      <img src={image} alt={`Book = ${title}`} />
    </div>
  );

  return (
    <div className={style.card}>
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
