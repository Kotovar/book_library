import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Book } from '../types/types';

interface BookSearch {
  kind: string;
  items?: Book[];
  totalItems: number;
}

type BooksArrayResult = Book[] | [];

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/books/v1/',
  }),
  endpoints: builder => ({
    getBookById: builder.query<Book, string>({
      query: id => `volumes/${id}`,
    }),

    findBookByName: builder.query<BooksArrayResult, string>({
      query: name => `volumes?q=${name}`,
      transformResponse: (response: BookSearch) => response.items ?? [],
    }),
  }),
});

export const { useGetBookByIdQuery, useFindBookByNameQuery } = bookApi;
