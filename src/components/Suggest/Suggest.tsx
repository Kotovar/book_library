import React from 'react';

import type { VolumeInfo } from '../../types/types';
import { useHandleNavigateClick, getBookDetailsSuggest } from '../../utils';

import style from './Suggest.module.css';

interface Props {
  id: string;
  volumeInfo: VolumeInfo;
}

export const Suggest = React.memo(({ id, volumeInfo }: Props) => {
  const handleClick = useHandleNavigateClick();

  const { authors, image, title } = getBookDetailsSuggest(volumeInfo);
  return (
    <button
      className={style.suggest}
      key={id}
      onMouseDown={e => handleClick(e, id)}
    >
      <img src={image} alt={title} />
      <div>
        <p>{title}</p>
        <p>{authors}</p>
      </div>
    </button>
  );
});
