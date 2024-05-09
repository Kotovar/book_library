import { useSearchParams } from 'react-router-dom';

import { SearchForm } from './SearchComponents/SearchForm';

export const SearchComponent = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = decodeURIComponent(searchParams.toString());
  let queryString = '';

  queryString = searchQuery.replace(/\+/g, ' ').replace(/=$/, '');

  return (
    <main>
      <h1>Search</h1>
      <SearchForm searchParams={queryString} />
    </main>
  );
};
