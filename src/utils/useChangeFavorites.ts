import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addFavorite,
  getError,
  removeFavorite,
} from '../features/featureAuthorization/AuthorizationSlice';

import { writeUserData, removeUserFavorite } from './getFirebaseData';
import { selectUser } from './selectors';

export const useChangeFavorites = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const changeFavorites = async (bookId: string) => {
    if (!user) {
      dispatch(getError('User is not authorized'));
      return;
    }

    const userWithFavorites = {
      ...user,
      favorites: user.favorites || [],
    };

    if (userWithFavorites.favorites.includes(bookId)) {
      dispatch(removeFavorite(bookId));
      await removeUserFavorite(user.uid, bookId);
    } else {
      const updatedFavorites = [...userWithFavorites.favorites, bookId];
      dispatch(addFavorite(updatedFavorites));
      await writeUserData(user.uid, updatedFavorites, user.history);
    }
  };

  return changeFavorites;
};
