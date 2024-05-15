import DefaultBookCover from '../../public/nobookcover.webp';
import type { VolumeInfo } from '../types/types';

const convertToHttps = (url: string) => {
  return url.replace(/^http:/, 'https:');
};

export const getBookDetailsFull = (
  data: VolumeInfo | undefined,
  addedToFavorites: boolean
) => {
  let image: string;
  let imageUrl: string = DefaultBookCover;
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
      DefaultBookCover;

    imageUrl = convertToHttps(image);
    authors = data.authors?.join(', ') || 'Author not specified';
    text = addedToFavorites ? 'Remove from favorites' : 'Add to favorites';
    title = data.title ?? 'No name';
    description = data.description ?? 'No description';
    language = `Language: ${data.language}`;
    pages = `Pages: ${data.pageCount}`;
  }

  return { imageUrl, authors, text, title, description, language, pages };
};

export const getBookDetailsLite = (
  data: VolumeInfo | undefined,
  addedToFavorites: boolean
) => {
  let buttonText: string = '';
  let buttonTitle: string = '';
  let image: string;
  let imageUrl: string = DefaultBookCover;
  let title: string = '';

  if (data) {
    buttonText = addedToFavorites ? '♥' : '♡';
    buttonTitle = addedToFavorites
      ? 'Remove from favorites'
      : 'Add to favorites';
    image = data.imageLinks?.thumbnail || DefaultBookCover;
    imageUrl = convertToHttps(image);
    title = data.title || 'Untitled';
  }

  return { buttonText, buttonTitle, imageUrl, title };
};

export const getBookDetailsSuggest = (data: VolumeInfo) => {
  const authors = data.authors?.join(', ') || 'Author not specified';
  const image = data.imageLinks?.smallThumbnail ?? DefaultBookCover;
  const title = data.title;

  return { authors, image, title };
};
