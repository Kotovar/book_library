import { useForm } from 'react-hook-form';

import { useAuthForm } from '../../utils/useAuthForm';

interface IFormInput {
  email: string;
  password: string;
}

export const SignIn = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = useAuthForm('signIn');

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
