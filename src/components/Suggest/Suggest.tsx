import React from 'react';

import type { VolumeInfo } from '../../types/types';
import { useHandleNavigateClick, getBookDetailsSuggest } from '../../utils';

interface Props {
  id: string;
  volumeInfo: VolumeInfo;
}

export const Suggest = React.memo(({ id, volumeInfo }: Props) => {
  const handleClick = useHandleNavigateClick();

  const { authors, image, title } = getBookDetailsSuggest(volumeInfo);
  return (
    <li key={id} onMouseDown={e => handleClick(e, id)}>
      <img src={image} alt={title} />
      <div>
        <div>
          <p>{title}</p>
          <p>{authors}</p>
        </div>
      </div>
    </li>
  );
});
