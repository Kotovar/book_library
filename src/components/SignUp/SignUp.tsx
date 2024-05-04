import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { logIn } from '../../features/featureAuthorization/AuthorizationSlice';
import { auth } from '../../services/firebaseConfig';

interface IFormInput {
  email: string;
  password: string;
}

export const SignUp = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;

        dispatch(logIn({ uid: user.uid }));
        navigate('/favorites');
      })
      .catch(error => {
        throw new Error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Login</label>
      <input {...register('email')} />
      <label>Password</label>
      <input {...register('password')} />
      <input type='submit' value='Register' />
    </form>
  );
};
