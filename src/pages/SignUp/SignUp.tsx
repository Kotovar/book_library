import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';

import { useAuthForm } from '../../utils';

import style from './SignUp.module.css';

interface IFormInput {
  email: string;
  password: string;
}

export const SignUp = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = useAuthForm('signUp');
  const theme: 'light' | 'dark' = useOutletContext();
  const mainClass = theme === 'light' ? style.light : style.dark;
  const inputClass = theme === 'light' ? style.darkInput : style.lightInput;

  return (
    <main className={`${style.main} ${mainClass}`}>
      <div className={style.container}>
        <h1>Registration</h1>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={style.label}>
            Email{' '}
            <input
              className={`${style.input} ${inputClass}`}
              type='email'
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
          <input className={style.button} type='submit' value='Register' />
        </form>
      </div>
    </main>
  );
};
