import { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { useFindBookByNameQuery } from '../../../services/booksApi';

import style from './SearchForm.module.css';
import { SearchResultsForm } from './SearchResultsForm';

interface Props {
  searchParams?: string;
}

export const SearchForm = ({ searchParams }: Props) => {
  const [searchTerm, setSearchTerm] = useState(searchParams ?? '');
  const [visibleResults, setVisibleResults] = useState(true);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const navigate = useNavigate();
  const { data, error, isLoading } = useFindBookByNameQuery(
    debouncedSearchTerm,
    {
      skip: debouncedSearchTerm.trim() === '',
    }
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchParams]);

  const checkKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm.trim() !== '') {
        navigate(`/search?${searchTerm}`);
      }
    }
    return;
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/search?${searchTerm}`);
    }
  };

  const listBooks =
    searchTerm !== '' && data
      ? data.map(book => {
          return (
            <SearchResultsForm
              key={book.id}
              id={book.id}
              volumeInfo={book.volumeInfo}
            />
          );
        })
      : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div>
          <input
            ref={inputRef}
            className={style.input}
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={checkKeyDown}
            onBlur={() => setVisibleResults(true)}
            onFocus={() => setVisibleResults(false)}
          />
          <div hidden={visibleResults} className={style['search-result']}>
            {isLoading && <p>Searching...</p>}
            {listBooks}
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
