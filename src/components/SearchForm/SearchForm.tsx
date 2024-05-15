import { useCallback, useMemo, useState } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { useFindBookByNameQuery } from '../../features/featureBooksApi/booksApi';
import { useChangeHistory } from '../../utils/useChangeHistory';
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

  return (
    <div className={style.container}>
      <form className={style.form}>
        <div>
          <input
            className={style.input}
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
          className={style['input-button']}
          type='button'
          value='Search'
          onClick={handleSearch}
        />
      </form>

      {error && <p>Error occurred: {error.toString()}</p>}
    </div>
  );
};

SearchForm.propTypes = {
  searchParams: PropTypes.string,
};