import { useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

import { useAppDispatch } from '../app/hooks';
import {
  logIn,
  logOut,
} from '../features/featureAuthorization/AuthorizationSlice';
import { auth } from '../services/firebaseConfig';

import { getFirebaseData } from './getFirebaseData';

export const useFirebaseAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, async user => {
      if (user) {
        const [favorites, history] = await getFirebaseData(user.uid);

        dispatch(
          logIn({ uid: user.uid, favorites: favorites, history: history })
        );
      } else {
        dispatch(logOut());
      }
    });

    return subscriber;
  }, [dispatch]);
};
