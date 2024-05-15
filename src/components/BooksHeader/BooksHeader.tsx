import { useContext } from 'react';

import { Toaster } from 'react-hot-toast';
import { Outlet, Link } from 'react-router-dom';

import HeaderLogo from '../../../public/library.svg';
import { ThemeContext } from '../../app/context/ThemeContext';
import { useAppSelector } from '../../app/hooks';
import { selectIsAuthenticated, selectIsLoaded } from '../../utils/selectors';
import { useLogout } from '../../utils/useLogout';

import style from './BooksHeader.module.css';

export const BooksHeader = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoaded);
  const logOut = useLogout();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const headerClass = theme === 'light' ? style.light : style.dark;

  let headerContent;
  if (isLoading) {
    headerContent = null;
  } else if (isAuthenticated) {
    headerContent = (
      <>
        <Link className={style.link} to='/favorites'>
          Favorites
        </Link>
        <Link className={style.link} to='/history'>
          History
        </Link>
        <button className={style.button} onClick={logOut}>
          Sign Out
        </button>
      </>
    );
  } else {
    headerContent = (
      <>
        <Link className={style.link} to='/signup'>
          Registration
        </Link>
        <Link className={style.link} to='/signin'>
          Sign In
        </Link>
      </>
    );
  }

  return (
    <>
      <header className={`${style.header} ${headerClass}`}>
        <div className={style.container}>
          <Link to='/' className={style.logo}>
            <img src={HeaderLogo} alt='Header Logo' />
          </Link>
          <button className={style.button} onClick={toggleTheme}>
            Change theme
          </button>
        </div>

        <nav className={style.buttonPanel}>{headerContent}</nav>
      </header>
      <Toaster />
      <Outlet />
    </>
  );
};
