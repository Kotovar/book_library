import { signOut } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';
import { Outlet, Link } from 'react-router-dom';

import HeaderLogo from '../../../public/library.svg';
import { useAppSelector } from '../../app/hooks';
import { auth } from '../../services/firebaseConfig';
import { selectIsAuthenticated, selectIsLoaded } from '../../utils/selectors';

import styles from './BooksHeader.module.css';

const BooksHeader = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoaded);

  function logOutFirebase() {
    signOut(auth).catch(error => {
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
        <nav className={styles.buttonPanel}>{headerContent}</nav>
      </header>
      <Toaster />
      <Outlet />
    </>
  );
};

export default BooksHeader;
