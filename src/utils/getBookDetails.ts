import type { VolumeInfo } from '../types/types';

export const getBookDetailsFull = (
  data: VolumeInfo,
  addedToFavorites: boolean
) => {
  const image =
    data.imageLinks?.large ||
    data.imageLinks?.medium ||
    data.imageLinks?.small ||
    data.imageLinks?.thumbnail ||
    '../../../public/NoBookCover.webp';

  const authors = data.authors?.join(', ') || 'Author not specified';
  const text = addedToFavorites ? 'Remove from favorites' : 'Add to favorites';
  const title = data.title ?? 'No name';
  const description = data.description ?? 'No description';
  const language = `Language: ${data.language}`;
  const pages = `Pages: ${data.pageCount}`;

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
  const noBookCover = '../../../public/NoBookCover.webp';
  const image = data.imageLinks?.thumbnail || noBookCover;
  const title = data.title || 'Untitled';

  return { buttonText, buttonTitle, image, title };
};

export const getBookDetailsSuggest = (data: VolumeInfo) => {
  const authors = data.authors?.join(', ') || 'Author not specified';
  const image =
    data.imageLinks?.smallThumbnail ?? '../../../../public/NoBookCover.webp';
  const title = data.title;

  return { authors, image, title };
};
