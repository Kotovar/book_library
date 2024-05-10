import { useAppDispatch } from '../app/hooks';
import {
  addFavorite,
  removeFavorite,
} from '../features/featureAuthorization/AuthorizationSlice';
import type { User } from '../types/types';

import { writeUserData, removeUserFavorite } from './getFirebaseData';

export const useChangeFavorites = () => {
  const dispatch = useAppDispatch();

  const changeFavorites = async (
    user: User,
    bookId: string,
    addedToFavorites: boolean
  ) => {
    if (addedToFavorites) {
      dispatch(removeFavorite(bookId));

      await removeUserFavorite(user.uid, bookId);
    } else {
      const updatedFavorites = [...user.favorites, bookId];
      dispatch(addFavorite(updatedFavorites));

      await writeUserData(user.uid, updatedFavorites, user.history);
    }
  };

  return changeFavorites;
};
