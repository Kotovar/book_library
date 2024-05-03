import { Outlet, Link } from 'react-router-dom';

import HeaderLogo from '../../../public/library.svg';

import styles from './BooksHeader.module.css';

export const BooksHeader = () => {
  const isAuthenticated = false;

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
              <button>Выход</button>
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
