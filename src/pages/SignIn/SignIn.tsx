import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';

import { useAuthForm } from '../../utils';

import style from './SignIn.module.css';

interface IFormInput {
  email: string;
  password: string;
}

export const SignIn = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = useAuthForm('signIn');
  const theme: 'light' | 'dark' = useOutletContext();
  const mainClass = theme === 'light' ? style.light : style.dark;
  const inputClass = theme === 'light' ? style.darkInput : style.lightInput;

  return (
    <main className={`${style.main} ${mainClass}`}>
      <div className={style.container}>
        <h1>Sign In</h1>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={style.label}>
            Email{' '}
            <input
              className={`${style.input} ${inputClass}`}
              {...register('email', {
                required: true,
              })}
            />
          </label>
          <label className={style.label}>
            Password{' '}
            <input
              className={`${style.input} ${inputClass}`}
              type='password'
              {...register('password', {
                required: true,
              })}
            />
          </label>
          <input className={style.button} type='submit' value='Login' />
        </form>
      </div>
    </main>
  );
};
