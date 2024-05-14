import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import AuthorizationReducer from '../features/featureAuthorization/AuthorizationSlice';
import { bookApi } from '../features/featureBooksApi/booksApi';

import { listenerMiddleware } from './middlewares/userAuth';

export const store = configureStore({
  reducer: {
    authorization: AuthorizationReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      bookApi.middleware,
      listenerMiddleware.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
