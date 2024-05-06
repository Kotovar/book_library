import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  logIn,
  getError,
} from '../../features/featureAuthorization/AuthorizationSlice';
import { auth } from '../../services/firebaseConfig';
import type { FirebaseError } from '../../types/types';
import { selectErrors } from '../../utils/selectors';

interface IFormInput {
  email: string;
  password: string;
}

export const SignUp = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errors = useAppSelector(selectErrors);

  const onSubmit: SubmitHandler<IFormInput> = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;

        dispatch(logIn({ uid: user.uid }));
        navigate('/favorites');
      })
      .catch((error: FirebaseError) => {
        dispatch(getError(error.code));
      });
  };

  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'This email is already taken',
    'auth/weak-password': 'Try a more complex password',
    'auth/invalid-email': 'The email address is not valid',
    default: 'Unknown error',
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input {...register('email')} />
        <label>Password</label>
        <input type='password' {...register('password')} />
        <input type='submit' value='Register' />
      </form>
      {errors && (
        <p aria-live='assertive'>
          Error: {errorMessages[errors] || errorMessages['default']}
        </p>
      )}
    </>
  );
};
