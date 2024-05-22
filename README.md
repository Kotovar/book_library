# book_library

[![CI/CD](https://github.com/Kotovar/book_library/actions/workflows/main.yml/badge.svg)](https://github.com/Kotovar/book_library/actions/workflows/main.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/8f1e255d-11ce-49d0-8ede-46850be66f1d/deploy-status)](https://app.netlify.com/sites/google-book-library/deploys)

An application for searching books with the ability to authenticate in the application and add books to favorites.

[Live preview](https://google-book-library.netlify.app/)

## How to use

To use this application, Node.js and npm must be installed on your system. You can clone this repository and run the following commands:

`npm install` - to install all dependencies

`npm run dev` - to run a local server with the application

open `http://localhost:[path]` in your browser

## How it works

[Google Books API](https://developers.google.com/books/docs/overview) is used to search for books

[Firebase API ](https://firebase.google.com/) is used for registration and authentication

The basis of the project is redux toolkit and RTK Query

Also used:

- React
- Typescript
- Github Actions CI/CD
- CSS modules
- Libraries:
  - [react-hot-toast](https://react-hot-toast.com/)
  - [use-debounce](https://www.npmjs.com/package/use-debounce)
  - [react-hook-form](https://react-hook-form.com/)

## The following tasks were implemented:

**React**

- [x] Use **functional components with hooks**.
- [x] There is a division into **smart and stupid components**.
- [x] There is [**list rendering**](https://github.com/Kotovar/book_library/blob/main/src/pages/HomePage/HomePage.tsx).
- [x] [**Forms**](https://github.com/Kotovar/book_library/blob/main/src/pages/SignIn/SignIn.tsx) implemented
- [x] There is [**Context API**](https://github.com/Kotovar/book_library/blob/main/src/app/context/ThemeContext.ts).
- [x] There is a [**fuse**](https://github.com/Kotovar/book_library/blob/main/src/App.tsx).
- [x] There are [**custom hooks**](https://github.com/Kotovar/book_library/blob/main/src/utils/useFirebaseAuth.ts).
- [x] There is a use of **PropTypes**: [**BookCardMiniFavorite**](https://github.com/Kotovar/book_library/blob/main/src/components/BookCardMini/BookCardMiniFavorite.tsx), [**SearchForm**](https://github.com/Kotovar/book_library/blob/main/src/components/SearchForm/SearchForm.tsx)
- [x] The search should not trigger many requests to the server [**debounce**](https://github.com/Kotovar/book_library/blob/main/src/components/SearchForm/SearchForm.tsx).
- [x] There is a use [**lazy + Suspense**](https://github.com/Kotovar/book_library/blob/main/src/routes/Router.tsx).

**Redux**

- [x] Use **Modern Redux with Redux Toolkit** - [store](https://github.com/Kotovar/book_library/blob/main/src/app/store.ts).
- [x] Use [**slices**](https://github.com/Kotovar/book_library/blob/main/src/features/featureAuthorization/AuthorizationSlice.ts).
- [x] There are [**custom middleware**](https://github.com/Kotovar/book_library/blob/main/src/app/middlewares/userAuth.ts).
- [x] Use [**RTK Query**](https://github.com/Kotovar/book_library/blob/main/src/features/featureBooksApi/booksApi.ts).
- [x] Use [**Transforming Responses**](https://github.com/Kotovar/book_library/blob/main/src/features/featureBooksApi/booksApi.ts).

## Other

- [x] Use **TypeScript**.
- [x] Use [**Firebase**](https://github.com/Kotovar/book_library/blob/main/src/services/firebaseConfig.ts).
- [x] Configured [**CI/CD**](https://github.com/Kotovar/book_library/blob/main/.github/workflows/main.yml)
- [x] Use [**memoized selectors**](https://github.com/Kotovar/book_library/blob/main/src/utils/selectors.ts)
