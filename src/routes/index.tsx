import { Route, Routes } from 'react-router-dom';

import { BooksHeader } from '../components/BooksHeader/BooksHeader';
import { Favorites } from '../components/Favorites/Favorites';
import { History } from '../components/History/History';
import { HomePage } from '../components/HomePage/HomePage';
import { NotFound } from '../components/NotFound/NotFound';
import { SignIn } from '../components/SignIn/SignIn';
import { SignUp } from '../components/SignUp/SignUp';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<BooksHeader />}>
        <Route index element={<HomePage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/history' element={<History />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
