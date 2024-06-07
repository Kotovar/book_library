import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeHistory,
  addHistory,
} from '../features/featureAuthorization/AuthorizationSlice';

import { writeUserData, removeUserHistory } from './getFirebaseData';
import { selectUser } from './selectors';

export const useChangeHistory = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const changeHistory = async (toAdd: boolean, history: string) => {
    if (!user) {
      return;
    }

    const userWithHistory = {
      ...user,
      history: user.history || [],
    };

    if (toAdd) {
      if (!userWithHistory.history.includes(history.trim())) {
        const updatedHistory = [...userWithHistory.history, history];
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
