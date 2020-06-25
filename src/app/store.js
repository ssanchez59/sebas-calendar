import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../extras/counter/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
