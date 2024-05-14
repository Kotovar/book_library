import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';
import type { Route } from '../types/types';
import { selectUser } from '../utils/selectors';

export const PublicRoute = ({ redirectPath = '/' }: Route) => {
  const user = useAppSelector(selectUser);

  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
