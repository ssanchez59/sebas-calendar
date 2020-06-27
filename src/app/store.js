import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../extras/counter/counterSlice';
import calendarReducer from '../features/calendar/calendarSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    reminders: calendarReducer,
  },
});
