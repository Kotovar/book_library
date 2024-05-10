import { useFindBookByNameQuery } from '../../services/booksApi';
import { BookCardMini } from '../BookCardMini/BookCardMini';
import { SearchForm } from '../Search/SearchForms/SearchForm';

import style from './HomePage.module.css';

const bookTopics = [
  'flowers',
  'scientific',
  'games',
  'programming',
  'education',
  'history',
  'kindness',
  'space',
  'plants',
  'animals',
];

export const HomePage = () => {
  const { data, error, isLoading } = useFindBookByNameQuery(bookTopics[0]);

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
      {isLoading && <p>Loading...</p>}
      {error && <p>Error occurred: {error.toString()}</p>}
      <ul className={style.ul}>{listBooks}</ul>
    </main>
  );
};
