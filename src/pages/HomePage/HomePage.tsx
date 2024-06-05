import { useOutletContext } from 'react-router-dom';

import { BookCardMini } from '../../components/BookCardMini/BookCardMini';
import { FetchStatus } from '../../components/FetchStatus/FetchStatus';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { useFindBookByNameQuery } from '../../features/featureBooksApi/booksApi';

import style from './HomePage.module.css';

const HomePage = () => {
  const { data, error, isLoading } = useFindBookByNameQuery('programming');
  const theme: 'light' | 'dark' = useOutletContext();
  const mainClass = theme === 'light' ? style.light : style.dark;

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
    <main className={`${mainClass}`}>
      <h1>Home page</h1>
      <SearchForm />
      <FetchStatus
        isLoading={isLoading}
        error={error}
        data={data}
        theme={theme}
      >
        <ul className={style.ul}>{listBooks}</ul>
      </FetchStatus>
    </main>
  );
};

export default HomePage;
