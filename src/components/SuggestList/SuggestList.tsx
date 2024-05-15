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
  const listBooks =
    !searchTerm || !data ? null : data.length > 0 ? (
      data
        .slice(0, numberOfSuggest)
        .map(book => (
          <Suggest key={book.id} id={book.id} volumeInfo={book.volumeInfo} />
        ))
    ) : (
      <p>Nothing found</p>
    );

  return listBooks;
};
