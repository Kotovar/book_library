import { useAppSelector } from '../app/hooks';

import { selectUser } from './selectors';
export const useGetHistory = () => {
  const user = useAppSelector(selectUser);
  const userHistory = user?.history ?? [];

  return userHistory;
};
