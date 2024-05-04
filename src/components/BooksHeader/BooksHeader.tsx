import { signOut } from 'firebase/auth';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import HeaderLogo from '../../../public/library.svg';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAuth } from '../../features/featureAuthorization/AuthorizationSlice';
import { logOut } from '../../features/featureAuthorization/AuthorizationSlice';
import { auth } from '../../services/firebaseConfig';

import styles from './BooksHeader.module.css';

export const BooksHeader = () => {
  const isAuthenticated: boolean = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logOutFirebase() {
    signOut(auth)
      .then(() => {
        dispatch(logOut());
        navigate('/');
      })
      .catch(error => {
        throw new Error(error);
      });
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
              <button onClick={logOutFirebase}>Выход</button>
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
