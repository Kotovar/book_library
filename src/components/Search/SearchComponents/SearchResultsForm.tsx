import { useState, useEffect } from 'react';

import { useAppSelector } from '../../../app/hooks';
import type { User, VolumeInfo } from '../../../types/types';
import { selectUser } from '../../../utils/selectors';
import { useChangeFavorites } from '../../../utils/useChangeFavorites';
import { useHandleClick } from '../../../utils/useHandleClick';
import ToolTip from '../../ToolTipComponent/ToolTip';

import style from './SearchForm.module.css';

interface Props {
  id: string;
  volumeInfo: VolumeInfo;
}

export const SearchResultsForm = ({ id, volumeInfo }: Props) => {
  const [visible, setVisible] = useState<boolean>(true);
  const changeFavorites = useChangeFavorites();
  const handleClick = useHandleClick();
  const user: User | null = useAppSelector(selectUser);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!visible) {
      timer = setTimeout(() => {
        setVisible(true);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [visible]);

  const authors = volumeInfo?.authors?.join(', ') || 'Author not specified';

  const addedToFavorites = id ? user?.favorites.includes(id) ?? false : false;

  const buttonText = addedToFavorites ? '♥' : '♡';
  const buttonTitle = addedToFavorites
    ? 'Remove from favorites'
    : 'Add to favorites';

  const handleFavoriteClick = () => {
    if (!user) {
      setVisible(false);
      return;
    }
    if (id) {
      changeFavorites(id, addedToFavorites);
    }
  };

  return (
    <li key={id} onMouseDown={e => handleClick(e, id)}>
      <img
        src={
          volumeInfo.imageLinks?.smallThumbnail ??
          '../../../../public/NoBookCover.webp'
        }
        alt={volumeInfo.title}
      />
      <div>
        <div>
          <p>{volumeInfo.title}</p>
          <p>{authors}</p>
        </div>

        <ToolTip visible={visible}>
          <button
            title={buttonTitle}
            className={style.button}
            onMouseDown={handleFavoriteClick}
          >
            {buttonText}
          </button>
        </ToolTip>
      </div>
    </li>
  );
};
