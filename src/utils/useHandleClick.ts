import { useNavigate } from 'react-router-dom';

export const useHandleClick = () => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLElement>, bookId: string) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'BUTTON') {
      navigate(`/book/${bookId}`);
    }
  };

  return handleClick;
};
