import { useOutletContext } from 'react-router-dom';

import style from './Loader.module.css';

export const Loader = () => {
  const theme: 'light' | 'dark' = useOutletContext() ?? 'light';
  const mainClass = theme === 'light' ? style.light : style.dark;

  return (
    <main className={mainClass}>
      <p className={style.p}>Loading...</p>
    </main>
  );
};
