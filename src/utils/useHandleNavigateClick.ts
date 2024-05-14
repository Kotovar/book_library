import { useNavigate } from 'react-router-dom';

export const useHandleNavigateClick = () => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLElement>, bookId: string) => {
    if (e.currentTarget.tagName !== 'BUTTON') {
      navigate(`/book/${bookId}`);
    }
  };

  return handleClick;
};
