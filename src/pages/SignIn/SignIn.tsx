import { signInWithEmailAndPassword } from 'firebase/auth';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { getError } from '../../features/featureAuthorization/AuthorizationSlice';
import { auth } from '../../services/firebaseConfig';

interface IFormInput {
  email: string;
  password: string;
}

const SignIn = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(-1);
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string'
      ) {
        dispatch(getError(error.message));
      } else {
        dispatch(getError('unknown-error'));
      }
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          {...register('email', {
            required: true,
          })}
        />
        <label>Password</label>
        <input
          type='password'
          {...register('password', {
            required: true,
          })}
        />
        <input type='submit' value='Login' />
      </form>
    </main>
  );
};

export default SignIn;
