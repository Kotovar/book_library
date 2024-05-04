import { configureStore } from '@reduxjs/toolkit';

import AuthorizationReducer from '../features/featureAuthorization/AuthorizationSlice';

const store = configureStore({
  reducer: {
    authorization: AuthorizationReducer, // Используйте ключ 'authorization'
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
