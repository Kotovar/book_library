import { Outlet, Link } from 'react-router-dom';

import HeaderLogo from '../../../public/library.svg';
import { useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
import { selectAuth } from '../../features/featureAuthorization/AuthorizationSlice';
import { logOut } from '../../features/featureAuthorization/AuthorizationSlice';

import styles from './BooksHeader.module.css';

export const BooksHeader = () => {
  const isAuthenticated: boolean = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  function testLogOut() {
    dispatch(logOut());
  }

  return (
    <>
      <header className={styles.header}>
        <Link to='/' className={styles.logo}>
          <img src={HeaderLogo} alt='Header Logo' />
        </Link>
        <div className={styles.buttonPanel}>
          {isAuthenticated ? (
            <>
              <Link to='/favorites'>Избранное</Link>
              <Link to='/history'>История</Link>
              <button onClick={testLogOut}>Выход</button>
            </>
          ) : (
            <>
              <Link to='/signup'>Регистрация</Link>
              <Link to='/signin'>Вход</Link>
            </>
          )}
        </div>
      </header>

      <Outlet />
    </>
  );
};
