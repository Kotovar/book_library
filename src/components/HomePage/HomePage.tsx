import { BookCardMini } from '../BookCardMini/BookCardMini';
import { SearchForm } from '../Search/SearchComponents/SearchForm';

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

const listBooks = bookTopics.map(book => {
  return (
    <li key={book} className={style.li}>
      <BookCardMini bookName={book} />
    </li>
  );
});

export const HomePage = () => {
  return (
    <main>
      <h1>Home page</h1>
      <SearchForm />
      <ul className={style.ul}>{listBooks}</ul>
    </main>
  );
};
