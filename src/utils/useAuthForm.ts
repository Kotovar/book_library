import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import type { Auth, UserCredential } from 'firebase/auth';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../app/hooks';
import { getError } from '../features/featureAuthorization/AuthorizationSlice';
import { auth } from '../services/firebaseConfig';
import type { Input } from '../types/types';

export const useAuthForm = (
  action: 'signIn' | 'signUp'
): SubmitHandler<Input> => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authFunction: (
    auth: Auth,
    email: string,
    password: string
  ) => Promise<UserCredential> =
    action === 'signIn'
      ? signInWithEmailAndPassword
      : createUserWithEmailAndPassword;

  return async ({ email, password }) => {
    try {
      await authFunction(auth, email, password);
      navigate('/');
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
