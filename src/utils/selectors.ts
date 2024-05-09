import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../app/store';

const selectAuthState = (state: RootState) => state.authorization;
const selectRandomState = (state: RootState) => state.random;

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

export const selectRandomNumber = createSelector(
  [selectRandomState],
  randomState => randomState.value
);
