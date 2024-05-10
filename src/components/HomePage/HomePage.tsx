import { useFindBookByNameQuery } from '../../features/featureBooksApi/booksApi';
import { BookCardMini } from '../BookCardMini/BookCardMini';
import { SearchForm } from '../SearchForms/SearchForm';

import style from './HomePage.module.css';

export const HomePage = () => {
  const { data, error, isLoading } = useFindBookByNameQuery('programming');

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
      <h1>Home page</h1>
      <SearchForm />
      {isLoading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p>Error occurred: {error.toString()}</p>}
      <ul className={style.ul}>{listBooks}</ul>
    </main>
  );
};
