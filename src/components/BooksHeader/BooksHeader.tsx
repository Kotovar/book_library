import { signOut } from 'firebase/auth';
import { Outlet, Link } from 'react-router-dom';

import HeaderLogo from '../../../public/library.svg';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logOut } from '../../features/featureAuthorization/AuthorizationSlice';
import { auth } from '../../services/firebaseConfig';
import { selectIsAuthenticated, selectIsLoaded } from '../../utils/selectors';

import styles from './BooksHeader.module.css';

export const BooksHeader = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoaded);

  const dispatch = useAppDispatch();

  function logOutFirebase() {
    signOut(auth)
      .then(() => {
        dispatch(logOut());
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  let headerContent;
  if (isLoading) {
    headerContent = null;
  } else if (isAuthenticated) {
    headerContent = (
      <>
        <Link to='/favorites'>Favorites</Link>
        <Link to='/history'>History</Link>
        <button onClick={logOutFirebase}>Sign Out</button>
      </>
    );
  } else {
    headerContent = (
      <>
        <Link to='/signup'>Registration</Link>
        <Link to='/signin'>Sign In</Link>
      </>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <Link to='/' className={styles.logo}>
          <img src={HeaderLogo} alt='Header Logo' />
        </Link>
        <div className={styles.buttonPanel}>{headerContent}</div>
      </header>

      <Outlet />
    </>
  );
};
