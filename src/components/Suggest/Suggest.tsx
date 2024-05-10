import type { VolumeInfo } from '../../types/types';
import { getBookDetailsSuggest } from '../../utils/getBookDetails';
import { useHandleNavigateClick } from '../../utils/useHandleNavigateClick';

interface Props {
  id: string;
  volumeInfo: VolumeInfo;
}

export const Suggest = ({ id, volumeInfo }: Props) => {
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
};
