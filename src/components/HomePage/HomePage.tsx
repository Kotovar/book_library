import {
  useFindBookByNameQuery,
  // useGetBookByIdQuery,
} from '../../services/booksApi';

export const HomePage = () => {
  const { data } = useFindBookByNameQuery('2');
  // const { data: book } = useGetBookByIdQuery('tTc1DwAAQBAJ');
  function getBook() {
    console.log(data);
    // console.log(book);
  }

  return (
    <>
      <h2>Home page</h2>
      <button onClick={getBook}>Get book</button>
    </>
  );
};
