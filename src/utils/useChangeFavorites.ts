import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addFavorite,
  removeFavorite,
} from '../features/featureAuthorization/AuthorizationSlice';

import { writeUserData, removeUserFavorite } from './getFirebaseData';
import { selectUser } from './selectors';

export const useChangeFavorites = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const changeFavorites = async (bookId: string, addedToFavorites: boolean) => {
    if (!user) {
      return;
    }

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
