import { useEffect } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getError } from '../../features/featureAuthorization/AuthorizationSlice';
import { auth } from '../../services/firebaseConfig';
import type { FirebaseError } from '../../types/types';
import { selectErrors } from '../../utils/selectors';

import styles from './SignIn.module.css';

interface IFormInput {
  email: string;
  password: string;
}

const SignIn = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errors = useAppSelector(selectErrors);

  useEffect(() => {
    return () => {
      if (errors) dispatch(getError(null));
    };
  }, [dispatch, errors]);

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(-1);
    } catch (error) {
      if ((error as FirebaseError).code) {
        dispatch(getError((error as FirebaseError).code));
      } else {
        dispatch(getError('unknown-error'));
      }
    }
  };

  const errorMessages: Record<string, string> = {
    'auth/invalid-credential': 'Incorrect password entered',
    'auth/invalid-email': 'Invalid email address entered',
    'auth/too-many-requests': 'Too many attempts - try again later',
    default: 'Unknown error',
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          {...register('email', {
            required: true,
            onChange: () => {
              if (errors) dispatch(getError(null));
            },
          })}
        />
        <label>Password</label>
        <input
          type='password'
          {...register('password', {
            required: true,
            onChange: () => {
              if (errors) dispatch(getError(null));
            },
          })}
        />
        <input type='submit' value='Login' />
      </form>
      {errors && (
        <p className={styles.error} aria-live='assertive'>
          {errorMessages[errors] || errorMessages['default']}
        </p>
      )}
    </main>
  );
};

export default SignIn;