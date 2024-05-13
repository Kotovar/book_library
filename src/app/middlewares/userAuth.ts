import { createListenerMiddleware } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import {
  logIn,
  logOut,
} from '../../features/featureAuthorization/AuthorizationSlice';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: logIn,
  effect: () => {
    toast.success(`Successful Login!`);
  },
});

listenerMiddleware.startListening({
  actionCreator: logOut,
  effect: () => {
    toast.success('Successful logout');
  },
});
