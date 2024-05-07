import { useFindBookByNameQuery } from '../../services/booksApi';

interface Props {
  bookName: string;
}

export const BookCardMini = ({ bookName }: Props) => {
  const { data, error, isLoading } = useFindBookByNameQuery(bookName);

  if (error) return <p>Error loading book.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;

  const bookTitle = data[0]?.volumeInfo?.title || 'Untitled';
  const image = data[0]?.volumeInfo?.imageLinks?.thumbnail || null;
  const bookId = data[0]?.id || null;
  let finishedImage: JSX.Element | null = null;
  if (image) {
    // ширина книги - 128px
    finishedImage = <img src={image} alt={`Book = ${bookTitle}`} />;
  }

  const handleClick = () => {
    console.log('Книга была кликнута:', bookTitle, ' ID: ', bookId);
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3>{bookTitle}</h3>
      {finishedImage}
    </div>
  );
};
