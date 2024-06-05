export type User = {
  uid: string;
  favorites?: string[];
  history?: string[];
};

export interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: Object;
  searchInfo: Object;
  accessInfo: Object;
}

export type BooksArrayResult = Book[] | [];

export type VolumeInfo = {
  title: string;
  authors?: string[];
  description?: string;
  language: string;
  pageCount: number;

  imageLinks?: {
    extraLarge?: string;
    large?: string;
    medium?: string;
    small?: string;
    smallThumbnail?: string;
    thumbnail?: string;
  };
};

export interface BookSearch {
  kind: string;
  items?: Book[];
  totalItems: number;
}

export interface Route {
  redirectPath?: string;
}

export interface Input {
  email: string;
  password: string;
}

export interface BookDetailsFull {
  imageUrl: string;
  authors: string;
  text: string;
  title: string;
  description: string;
  language: string;
  pages: string;
}

export interface BookDetailsLite {
  buttonText: string;
  buttonTitle: string;
  imageUrl: string;
  title: string;
}

export type Theme = 'dark' | 'light';
export type ThemeInstall = [
  Theme,
  React.Dispatch<React.SetStateAction<string>>,
];
