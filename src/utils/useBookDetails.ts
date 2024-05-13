import { useAppSelector } from '../app/hooks';

import { makeSelectIsFavorite, selectUser } from './selectors';

export const useBookDetails = (bookId: string) => {
  const user = useAppSelector(selectUser);
  const addedToFavorites = useAppSelector(makeSelectIsFavorite(bookId));

  return { user, addedToFavorites };
};
