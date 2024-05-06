import { useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

import { useAppDispatch } from '../app/hooks';
import {
  logIn,
  logOut,
} from '../features/featureAuthorization/AuthorizationSlice';
import { auth } from '../services/firebaseConfig';

const useFirebaseAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(logIn({ uid: user.uid }));
      } else {
        dispatch(logOut());
      }
    });

    return () => subscriber();
  }, [dispatch]);
};

export default useFirebaseAuth;
