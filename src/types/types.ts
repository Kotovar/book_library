export type FirebaseError = {
  code: string;
};

export type User = {
  uid: string;
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

type VolumeInfo = {
  title: string;
  authors: string[];
  imageLinks: {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
  };
};
