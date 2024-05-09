import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Book, BookSearch, VolumeInfo } from '../types/types';

type BooksArrayResult = Book[] | [];

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/books/v1/',
  }),
  endpoints: builder => ({
    getBookById: builder.query<VolumeInfo, string>({
      query: id => `volumes/${id}`,
      transformResponse: (response: Book) => response.volumeInfo,
    }),

    findBookByName: builder.query<BooksArrayResult, string>({
      query: name => `volumes?q=${name}`,
      transformResponse: (response: BookSearch) => response.items ?? [],
    }),
  }),
  keepUnusedDataFor: 300,
});

export const { useGetBookByIdQuery, useFindBookByNameQuery } = bookApi;
