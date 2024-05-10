import { useSearchParams } from 'react-router-dom';

import { useFindBookByNameQuery } from '../../features/featureBooksApi/booksApi';
import { BookCardMini } from '../BookCardMini/BookCardMini';

import style from './SearchComponent.module.css';
import { SearchForm } from './SearchForms/SearchForm';
export const SearchComponent = () => {
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
      {isLoading && <p>Loading...</p>}
      {error && <p>Error occurred: {error.toString()}</p>}
      <ul className={style.ul}>{listBooks}</ul>
    </main>
  );
};
