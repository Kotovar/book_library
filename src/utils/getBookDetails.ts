import type { VolumeInfo } from '../types/types';

const DEFAULT_BOOK_COVER = '../../../public/NoBookCover.webp';

export const getBookDetailsFull = (
  data: VolumeInfo | undefined,
  addedToFavorites: boolean
) => {
  let image: string = DEFAULT_BOOK_COVER;
  let authors: string = ' ';
  let text: string = '';
  let title: string = 'The book is loading';
  let description: string = '';
  let language: string = '';
  let pages: string = '';

  if (data) {
    image =
      data.imageLinks?.large ||
      data.imageLinks?.medium ||
      data.imageLinks?.small ||
      data.imageLinks?.thumbnail ||
      DEFAULT_BOOK_COVER;

    authors = data.authors?.join(', ') || 'Author not specified';
    text = addedToFavorites ? 'Remove from favorites' : 'Add to favorites';
    title = data.title ?? 'No name';
    description = data.description ?? 'No description';
    language = `Language: ${data.language}`;
    pages = `Pages: ${data.pageCount}`;
  }

  return { image, authors, text, title, description, language, pages };
};

export const getBookDetailsLite = (
  data: VolumeInfo,
  addedToFavorites: boolean
) => {
  const buttonText = addedToFavorites ? '♥' : '♡';
  const buttonTitle = addedToFavorites
    ? 'Remove from favorites'
    : 'Add to favorites';
  const noBookCover = DEFAULT_BOOK_COVER;
  const image = data.imageLinks?.thumbnail || noBookCover;
  const title = data.title || 'Untitled';

  return { buttonText, buttonTitle, image, title };
};

export const getBookDetailsSuggest = (data: VolumeInfo) => {
  const authors = data.authors?.join(', ') || 'Author not specified';
  const image = data.imageLinks?.smallThumbnail ?? DEFAULT_BOOK_COVER;
  const title = data.title;

  return { authors, image, title };
};
