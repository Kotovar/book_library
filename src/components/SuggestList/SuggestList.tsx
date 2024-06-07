import type { BooksArrayResult } from '../../types/types';
import { Suggest } from '../Suggest/Suggest';

interface Props {
  searchTerm: string;
  data: BooksArrayResult | undefined;
  numberOfSuggest?: number;
}

export const SuggestDetails = ({
  searchTerm,
  data,
  numberOfSuggest = 5,
}: Props) => {
  const getResults = (data: BooksArrayResult) => {
    return data.length < 1 ? (
      <p>Nothing found</p>
    ) : (
      data
        .slice(0, numberOfSuggest)
        .map(book => (
          <Suggest key={book.id} id={book.id} volumeInfo={book.volumeInfo} />
        ))
    );
  };

  const shouldDisplayBooks = !searchTerm || !data;

  const listBooks = shouldDisplayBooks ? null : getResults(data);

  return listBooks;
};
