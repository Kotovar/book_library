import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addFavorite,
  removeFavorite,
} from '../features/featureAuthorization/AuthorizationSlice';

import { writeUserData, removeUserData } from './getFirebaseData';
import { selectUser } from './selectors';

export const useChangeFavorites = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const changeFavorites = async (bookId: string, addedToFavorites: boolean) => {
    if (!user) {
      return;
    }

    if (addedToFavorites) {
      dispatch(removeFavorite(bookId));
      await removeUserData(user.uid, bookId);
    } else {
      const updatedFavorites = [...user.favorites, bookId];
      dispatch(addFavorite(updatedFavorites));
      writeUserData(user.uid, updatedFavorites);
    }
  };

  return changeFavorites;
};
