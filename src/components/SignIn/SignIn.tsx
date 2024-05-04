import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '../../app/hooks';
import { logIn } from '../../features/featureAuthorization/AuthorizationSlice';

interface IFormInput {
  email: string;
  password: string;
}

export const SignIn = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
  const dispatch = useAppDispatch();

  function testLogIn() {
    dispatch(logIn({ uid: '5' }));
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input {...register('email', { required: true })} />
        {/* {errors.email && <p>Email обязателен для заполнения</p>} */}
        <label>Password</label>
        <input type='password' {...register('password', { required: true })} />
        {/* {errors.password && <p>Пароль обязателен для заполнения</p>} */}
        <input type='submit' value='Login' />
      </form>
      <button onClick={testLogIn}>Зайти в систему - тест</button>
    </>
  );
};
