import { Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';
import { BookCardLarge } from '../components/BookCardLarge/BookCardLarge';
import { BooksHeader } from '../components/BooksHeader/BooksHeader';
import { Favorites } from '../components/Favorites/Favorites';
import { History } from '../components/History/History';
import { HomePage } from '../components/HomePage/HomePage';
import { NotFound } from '../components/NotFound/NotFound';
import { SearchComponent } from '../components/Search/SearchComponent';
import { SignIn } from '../components/SignIn/SignIn';
import { SignUp } from '../components/SignUp/SignUp';
import { selectUser, selectIsLoaded } from '../utils/selectors';

import { ProtectedRoute, PublicRoute } from './UsersRoutes';

export const Router = () => {
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoaded);

  if (isLoading) {
    return (
      <>
        <BooksHeader />
        <p>Loading...</p>
      </>
    );
  }

  return (
    <Routes>
      <Route path='/' element={<BooksHeader />}>
        <Route index element={<HomePage />} />
        <Route element={<PublicRoute user={user} />}>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/history' element={<History />} />
        </Route>
        <Route path='/book/:id' element={<BookCardLarge />} />
        <Route path='/search' element={<SearchComponent />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
