import { configureStore } from '@reduxjs/toolkit';
import ContactsSlice from './ContactsSlice';
import AuthSlice from './AuthSlice';

const store = configureStore({
  reducer: {
    ContactsSlice,
    AuthSlice,
  },
});

export default store;
