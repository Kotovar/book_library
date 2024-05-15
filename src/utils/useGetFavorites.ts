import { useAppSelector } from '../app/hooks';

import { selectUser } from './selectors';

export const useGetFavorites = () => {
  const user = useAppSelector(selectUser);
  const userFavorites = user?.favorites || [];

  return userFavorites;
};
