import type { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import type { User } from '../types/types';
interface Props {
  user: User | null;
  redirectPath?: '/';
}

export const ProtectedRoute: FC<Props> = ({ user, redirectPath = '/' }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export const PublicRoute: FC<Props> = ({ user, redirectPath = '/' }) => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
