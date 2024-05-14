import { signOut } from 'firebase/auth';

import { useAppDispatch } from '../app/hooks';
import { getError } from '../features/featureAuthorization/AuthorizationSlice';
import { auth } from '../services/firebaseConfig';

export const useLogout = () => {
  const dispatch = useAppDispatch();

  return async () => {
    try {
      await signOut(auth);
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        typeof error.code === 'string'
      ) {
        dispatch(getError(error.code));
      } else {
        dispatch(getError('unknown-error'));
      }
    }
  };
};
