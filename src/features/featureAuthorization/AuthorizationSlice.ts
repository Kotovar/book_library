import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { User } from '../../types/types';

interface AuthorizationState {
  user: User | null;
  isAuthenticating: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthorizationState = {
  user: null,
  isAuthenticating: false,
  isLoading: true,
  error: null,
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticating = true;
      state.isLoading = false;
      state.error = null;
    },
    logOut: state => {
      state.user = null;
      state.isAuthenticating = false;
      state.isLoading = false;
      state.error = null;
    },
    addFavorite: (state, action: PayloadAction<string[]>) => {
      if (state.user) {
        state.user.favorites = action.payload;
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      if (state?.user?.favorites) {
        state.user.favorites = state.user.favorites.filter(
          id => id !== action.payload
        );
      }
    },
    addHistory: (state, action: PayloadAction<string[]>) => {
      if (state.user) {
        state.user.history = action.payload;
      }
    },
    removeHistory: (state, action: PayloadAction<string>) => {
      if (state?.user?.history) {
        state.user.history = state.user.history.filter(
          id => id !== action.payload
        );
      }
    },
    getError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  logIn,
  logOut,
  getError,
  addFavorite,
  removeFavorite,
  addHistory,
  removeHistory,
} = authorizationSlice.actions;

export default authorizationSlice.reducer;
