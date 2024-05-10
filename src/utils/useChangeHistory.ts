import { useAppDispatch } from '../app/hooks';
import { removeHistory } from '../features/featureAuthorization/AuthorizationSlice';
import { addHistory } from '../features/featureAuthorization/AuthorizationSlice';
import type { User } from '../types/types';

import { writeUserData, removeUserHistory } from './getFirebaseData';

export const useChangeHistory = () => {
  const dispatch = useAppDispatch();

  const changeHistory = async (user: User, toAdd: boolean, history: string) => {
    if (toAdd) {
      if (!user.history.includes(history.trim())) {
        const updatedHistory = [...user.history, history];
        dispatch(addHistory(updatedHistory));
        await writeUserData(user.uid, user.favorites, updatedHistory);
      }
    } else {
      dispatch(removeHistory(history));
      await removeUserHistory(user.uid, history);
    }
  };

  return changeHistory;
};
