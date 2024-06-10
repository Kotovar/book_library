import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { ThemeContext } from '../../app/context/ThemeContext';

import style from './NotFound.module.css';

export const NotFound = () => {
  const { theme } = useContext(ThemeContext);
  const mainClass = theme === 'light' ? style.light : style.dark;

  return (
    <main className={`${mainClass} ${style.main}`}>
      <h1 className={style.h1}>This page does not exist :( </h1>
      <Link className={style.link} to='/'>
        Back home
      </Link>
    </main>
  );
};
