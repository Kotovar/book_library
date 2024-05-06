import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AuthorizationState {
  user: User | null;
  isAuthenticating: boolean;
  isLoading: boolean;
  error: string | null;
}

interface User {
  uid: string;
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
    getError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { logIn, logOut, getError } = authorizationSlice.actions;
export default authorizationSlice.reducer;
