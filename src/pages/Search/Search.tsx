import { useOutletContext, useSearchParams } from 'react-router-dom';

import { BookCardMini } from '../../components/BookCardMini/BookCardMini';
import { FetchStatus } from '../../components/FetchStatus/FetchStatus';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { useFindBookByNameQuery } from '../../features/featureBooksApi/booksApi';

import style from './Search.module.css';

const SearchComponent = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = [...searchParams.keys()][0];
  const theme: 'light' | 'dark' = useOutletContext();
  const mainClass = theme === 'light' ? style.light : style.dark;

  const { data, error, isLoading } = useFindBookByNameQuery(searchQuery, {
    skip: searchQuery.trim() === '',
  });

  let listBooks: JSX.Element[] | JSX.Element = <p>Nothing found</p>;

  if (data && data.length > 0) {
    listBooks = data.map(book => {
      return (
        <li key={book.id}>
          <BookCardMini id={book.id} volumeInfo={book.volumeInfo} />
        </li>
      );
    });
  }
  return (
    <main className={`${mainClass}`}>
      <h1>Search</h1>
      <SearchForm searchParams={searchQuery} />
      <FetchStatus isLoading={isLoading} error={error} data={data}>
        <ul className={style.ul}>{listBooks}</ul>
      </FetchStatus>
    </main>
  );
};

export default SearchComponent;
