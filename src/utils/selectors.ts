import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../app/store';

const selectAuthState = (state: RootState) => state.authorization;

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  authorizationState => authorizationState.isAuthenticating
);

export const selectIsLoaded = createSelector(
  [selectAuthState],
  authorizationState => authorizationState.isLoading
);

export const selectErrors = createSelector(
  [selectAuthState],
  authorizationState => authorizationState.error
);

export const selectUser = createSelector(
  [selectAuthState],
  authorizationState => authorizationState.user
);