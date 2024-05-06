import { signInWithEmailAndPassword } from 'firebase/auth';
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

export const SignIn = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errors = useAppSelector(selectErrors);

  const onSubmit: SubmitHandler<IFormInput> = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
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
    'auth/invalid-credential': 'Incorrect password entered',
    'auth/invalid-email': 'Invalid email address entered',
    'auth/too-many-requests': 'Too many attempts - try again later',
    default: 'Unknown error',
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input {...register('email', { required: true })} />
        <label>Password</label>
        <input type='password' {...register('password', { required: true })} />
        <input type='submit' value='Login' />
      </form>
      {errors && (
        <p aria-live='assertive'>
          Error: {errorMessages[errors] || errorMessages['default']}
        </p>
      )}
    </>
  );
};
