import { useContext } from 'react';

import { ThemeContext } from '../../app/context/ThemeContext';

import style from './Loader.module.css';

export const Loader = () => {
  const { theme } = useContext(ThemeContext);
  const mainClass = theme === 'light' ? style.light : style.dark;

  return (
    <main className={mainClass}>
      <p className={style.p}>Loading...</p>
    </main>
  );
};
