import { BookCardMini } from '../../components/BookCardMini/BookCardMini';
import { FetchStatus } from '../../components/FetchStatus/FetchStatus';
import { SearchForm } from '../../components/SearchForms/SearchForm';
import { useFindBookByNameQuery } from '../../features/featureBooksApi/booksApi';

import style from './HomePage.module.css';

const HomePage = () => {
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
      <FetchStatus isLoading={isLoading} error={error} data={data}>
        <ul className={style.ul}>{listBooks}</ul>
      </FetchStatus>
    </main>
  );
};

export default HomePage;
