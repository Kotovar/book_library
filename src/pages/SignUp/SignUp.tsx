import { useForm } from 'react-hook-form';

import { useAuthForm } from '../../utils/useAuthForm';

import style from './SignUp.module.css';
interface IFormInput {
  email: string;
  password: string;
}

export const SignUp = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = useAuthForm('signUp');

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
        <input className={style.button} type='submit' value='Register' />
      </form>
    </main>
  );
};
