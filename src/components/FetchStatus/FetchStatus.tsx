import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import type { BooksArrayResult, VolumeInfo } from '../../types/types';

import style from './FetchStatus.module.css';

interface Props {
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  data: VolumeInfo | BooksArrayResult | undefined;
  children: JSX.Element;
}

export const FetchStatus = ({ isLoading, error, data, children }: Props) => {
  if (isLoading) {
    return (
      <main>
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
