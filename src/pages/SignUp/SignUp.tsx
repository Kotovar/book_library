import { useEffect } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getError } from '../../features/featureAuthorization/AuthorizationSlice';
import { auth } from '../../services/firebaseConfig';
import type { FirebaseError } from '../../types/types';
import { selectErrors } from '../../utils/selectors';

import styles from './SignUp.module.css';

interface IFormInput {
  email: string;
  password: string;
}

const SignUp = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errors = useAppSelector(selectErrors);

  useEffect(() => {
    return () => {
      if (errors) dispatch(getError(null));
    };
  }, [dispatch, errors]);

  const onSubmit: SubmitHandler<IFormInput> = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        navigate('/');
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
        <input type='submit' value='Register' />
      </form>
      {errors && (
        <p className={styles.error} aria-live='assertive'>
          {errorMessages[errors] || errorMessages['default']}
        </p>
      )}
    </main>
  );
};

export default SignUp;
