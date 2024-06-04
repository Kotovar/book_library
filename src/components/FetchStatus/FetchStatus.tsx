import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import type { BooksArrayResult, VolumeInfo } from '../../types/types';

import style from './FetchStatus.module.css';

interface Props {
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  data: VolumeInfo | BooksArrayResult | undefined;
  theme?: 'light' | 'dark';
  children: JSX.Element;
}

export const FetchStatus = ({
  isLoading,
  error,
  data,
  theme,
  children,
}: Props) => {
  const mainClass = theme === 'light' ? style.light : style.dark;

  if (isLoading) {
    return (
      <main className={mainClass}>
        <p className={style.p}>Loading...</p>
      </main>
    );
  }

  if (error) {
    return <p className={style.p}>Error loading book.</p>;
  }

  if (!data) return null;

  return children;
};
