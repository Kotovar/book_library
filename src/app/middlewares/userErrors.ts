import { createListenerMiddleware } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { getError } from '../../features/featureAuthorization/AuthorizationSlice';

export const listenerMiddleware = createListenerMiddleware();

const errorMessages: Record<string, string> = {
  'auth/invalid-credential': 'Incorrect password entered',
  'auth/invalid-email': 'Invalid email address entered',
  'auth/too-many-requests': 'Too many attempts - try again later',
  'auth/email-already-in-use': 'This email is already taken',
  'auth/weak-password': 'Try a more complex password',
  'User is not authorized': 'You need to sign in!',
  default: 'Unknown error',
};

listenerMiddleware.startListening({
  actionCreator: getError,
  effect: action => {
    if (action.payload) {
      toast.error(`Error: ${errorMessages[action.payload]}`);
    }
  },
});
