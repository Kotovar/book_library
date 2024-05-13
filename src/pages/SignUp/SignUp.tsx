import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { getError } from '../../features/featureAuthorization/AuthorizationSlice';
import { auth } from '../../services/firebaseConfig';
import type { FirebaseError } from '../../types/types';

interface IFormInput {
  email: string;
  password: string;
}

const SignUp = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error: FirebaseError) => {
        dispatch(getError(error.code));
      });
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
        <input type='submit' value='Register' />
      </form>
    </main>
  );
};

export default SignUp;
