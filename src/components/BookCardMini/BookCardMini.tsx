import { useState, useEffect } from 'react';

import { useAppSelector } from '../../app/hooks';
import type { VolumeInfo } from '../../types/types';
import { selectUser } from '../../utils/selectors';
import { useChangeFavorites } from '../../utils/useChangeFavorites';
import { useHandleClick } from '../../utils/useHandleClick';
import ToolTip from '../ToolTipComponent/ToolTip';

import style from './BookCardMini.module.css';

interface Props {
  id: string;
  volumeInfo: VolumeInfo;
}

export const BookCardMini = ({ id, volumeInfo }: Props) => {
  const [visible, setVisible] = useState<boolean>(true);
  const handleClick = useHandleClick();
  const changeFavorites = useChangeFavorites();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!visible) {
      timer = setTimeout(() => {
        setVisible(true);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [visible]);

  const handleFavoriteClick = () => {
    if (!user) {
      setVisible(false);
      return;
    }

    changeFavorites(id, addedToFavorites);
  };

  const addedToFavorites = id ? user?.favorites.includes(id) ?? false : false;

  const buttonText = addedToFavorites ? '♥' : '♡';
  const buttonTitle = addedToFavorites
    ? 'Remove from favorites'
    : 'Add to favorites';
  const noBookCover = '../../../public/NoBookCover.webp';
  const bookTitle = volumeInfo.title || 'Untitled';

  const image = volumeInfo.imageLinks?.thumbnail || noBookCover;
  const finishedImage: JSX.Element = (
    <div onClick={e => handleClick(e, id)} className={style.imageContainer}>
      <img src={image ?? noBookCover} alt={`Book = ${bookTitle}`} />
    </div>
  );

  return (
    <div className={style.card}>
      <p>{bookTitle}</p>
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
