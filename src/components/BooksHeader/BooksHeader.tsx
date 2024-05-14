import { useContext } from 'react';

import { Toaster } from 'react-hot-toast';
import { Outlet, Link } from 'react-router-dom';

import HeaderLogo from '../../../public/library.svg';
import { ThemeContext } from '../../app/context/ThemeContext';
import { useAppSelector } from '../../app/hooks';
import { selectIsAuthenticated, selectIsLoaded } from '../../utils/selectors';
import { useLogout } from '../../utils/useLogout';

import styles from './BooksHeader.module.css';

export const BooksHeader = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoaded);
  const logOut = useLogout();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const headerClass = theme === 'light' ? styles.light : styles.dark;

  let headerContent;
  if (isLoading) {
    headerContent = null;
  } else if (isAuthenticated) {
    headerContent = (
      <>
        <Link className={styles.link} to='/favorites'>
          Favorites
        </Link>
        <Link className={styles.link} to='/history'>
          History
        </Link>
        <button className={styles.button} onClick={logOut}>
          Sign Out
        </button>
      </>
    );
  } else {
    headerContent = (
      <>
        <Link className={styles.link} to='/signup'>
          Registration
        </Link>
        <Link className={styles.link} to='/signin'>
          Sign In
        </Link>
      </>
    );
  }

  return (
    <>
      <header className={`${styles.header} ${headerClass}`}>
        <div className={styles.container}>
          <Link to='/' className={styles.logo}>
            <img src={HeaderLogo} alt='Header Logo' />
          </Link>
          <button className={styles.button} onClick={toggleTheme}>
            Change theme
          </button>
        </div>

        <nav className={styles.buttonPanel}>{headerContent}</nav>
      </header>
      <Toaster />
      <Outlet />
    </>
  );
};
