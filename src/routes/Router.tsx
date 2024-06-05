import { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';
import { BooksHeader } from '../components/BooksHeader/BooksHeader';
import { Loader } from '../components/Loader/Loader';
import { History } from '../pages/History/History';
import { NotFound } from '../pages/NotFound/NotFound';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import { selectIsLoaded } from '../utils/selectors';

import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const FavoritesPage = lazy(() => import('../pages/Favorites/Favorites'));
const SearchComponentPage = lazy(() => import('../pages/Search/Search'));
const BookCardLargePage = lazy(
  () => import('../pages/BookCardLarge/BookCardLarge')
);

export const Router = () => {
  const isLoading = useAppSelector(selectIsLoaded);

  if (isLoading) {
    return (
      <>
        <BooksHeader />
        <Loader />
      </>
    );
  }

  return (
    <Routes>
      <Route path='/' element={<BooksHeader />}>
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route element={<PublicRoute />}>
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path='favorites'
            element={
              <Suspense fallback={<Loader />}>
                <FavoritesPage />
              </Suspense>
            }
          />
          <Route path='history' element={<History />} />
        </Route>
        <Route
          path='book/:id'
          element={
            <Suspense fallback={<Loader />}>
              <BookCardLargePage />
            </Suspense>
          }
        />
        <Route
          path='search'
          element={
            <Suspense fallback={<Loader />}>
              <SearchComponentPage />
            </Suspense>
          }
        />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
