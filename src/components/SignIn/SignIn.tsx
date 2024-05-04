import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

interface IFormInput {
  login: string;
  password: string;
}

export const SignIn = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Login</label>
      <input {...register('login')} />
      <label>Password</label>
      <input {...register('password')} />
      <input type='submit' value='Login' />
    </form>
  );
};
