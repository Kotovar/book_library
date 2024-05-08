import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import AuthorizationReducer from '../features/featureAuthorization/AuthorizationSlice';
import RandomNumbersReducer from '../features/featureBooks/RandomNumbersSlice';
import { bookApi } from '../services/booksApi';

const store = configureStore({
  reducer: {
    authorization: AuthorizationReducer,
    random: RandomNumbersReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
