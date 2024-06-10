import { useCallback, useMemo, useState } from 'react';

import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { useFindBookByNameQuery } from '../../features/featureBooksApi/booksApi';
import { useChangeHistory } from '../../utils';
import { SuggestDetails } from '../SuggestList/SuggestList';

import style from './SearchForm.module.css';

interface Props {
  searchParams?: string;
}

export const SearchForm = ({ searchParams }: Props) => {
  const [searchTerm, setSearchTerm] = useState(searchParams ?? '');
  const [visibleResults, setVisibleResults] = useState(true);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const navigate = useNavigate();
  const changeHistory = useChangeHistory();
  const theme: 'light' | 'dark' = useOutletContext();
  const inputClass = theme === 'light' ? style.light : style.dark;

  const { data, error, isLoading } = useFindBookByNameQuery(
    debouncedSearchTerm,
    {
      skip: debouncedSearchTerm.trim() === '',
    }
  );

  const handleSearch = useCallback(() => {
    if (searchTerm.trim() !== '') {
      navigate(`/search?${searchTerm}`);
      changeHistory(true, searchTerm);
    }
  }, [navigate, searchTerm, changeHistory]);

  const checkKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  const listBooks = useMemo(() => {
    return SuggestDetails({ searchTerm, data });
  }, [searchTerm, data]);

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
    if ('status' in error) {
      return 'error' in error ? error.error : JSON.stringify(error.data);
    } else {
      return error?.message ?? 'Unknown error';
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form}>
        <div>
          <input
            className={`${style.input} ${inputClass}`}
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={checkKeyDown}
            onBlur={() => setVisibleResults(true)}
            onFocus={() => setVisibleResults(false)}
          />
          <div hidden={visibleResults} className={style['search-result']}>
            {isLoading ? <p>Searching...</p> : listBooks}
          </div>
        </div>

        <input
          className={`${style.inputButton} ${inputClass}`}
          type='button'
          value='Search'
          onClick={handleSearch}
        />
      </form>

      {error && <p>{getErrorMessage(error)}</p>}
    </div>
  );
};
