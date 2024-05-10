import type { VolumeInfo } from '../../../types/types';
import { useHandleClick } from '../../../utils/useHandleClick';

interface Props {
  id: string;
  volumeInfo: VolumeInfo;
}

export const SearchResultsForm = ({ id, volumeInfo }: Props) => {
  const handleClick = useHandleClick();
  const authors = volumeInfo?.authors?.join(', ') || 'Author not specified';

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
      </div>
    </li>
  );
};
