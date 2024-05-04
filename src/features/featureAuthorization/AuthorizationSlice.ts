import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

interface AuthorizationState {
  user: User | null;
  isAuthenticating: boolean;
  error: string | null;
}

interface User {
  uid: string;
}

const initialState: AuthorizationState = {
  user: null,
  isAuthenticating: false,
  error: null,
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticating = true;
    },
    logOut: state => {
      state.user = null;
      state.isAuthenticating = false;
    },
  },
});

export const { logIn, logOut } = authorizationSlice.actions;
export const selectAuth = (state: RootState) =>
  state.authorization.isAuthenticating;
export default authorizationSlice.reducer;
