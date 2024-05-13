import { useSearchParams } from 'react-router-dom';

import { BookCardMini } from '../../components/BookCardMini/BookCardMini';
import { FetchStatus } from '../../components/FetchStatus/FetchStatus';
import { SearchForm } from '../../components/SearchForms/SearchForm';
import { useFindBookByNameQuery } from '../../features/featureBooksApi/booksApi';

import style from './Search.module.css';

const SearchComponent = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = [...searchParams.keys()][0];

  const { data, error, isLoading } = useFindBookByNameQuery(searchQuery, {
    skip: searchQuery.trim() === '',
  });

  let listBooks;
  if (data) {
    listBooks = data.map(book => {
      return (
        <li key={book.id}>
          <BookCardMini id={book.id} volumeInfo={book.volumeInfo} />
        </li>
      );
    });
  }

  return (
    <main>
      <h1>Search</h1>
      <SearchForm searchParams={searchQuery} />
      <FetchStatus isLoading={isLoading} error={error} data={data}>
        <ul className={style.ul}>{listBooks}</ul>
      </FetchStatus>
    </main>
  );
};

export default SearchComponent;
