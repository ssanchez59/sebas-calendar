import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import isSameDay from 'date-fns/isSameDay';

export const calendarSlice = createSlice({
  name: 'reminders',
  initialState: {
    value: [],
  },
  reducers: {
    addReminderAction: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      let arr = state.value;
      const { id } = action.payload;
      if (id) {
        const foundIndex = arr.findIndex((x) => x.id === id);
        arr[foundIndex] = action.payload;
      } else {
        const id = uuidv4();
        const objToAdd = action.payload;
        objToAdd.id = id;
        arr = [...arr, objToAdd];
      }
      state.value = arr;
    },
    deleteReminderAction: (state, action) => {
      const { id } = action.payload;
      let arr = state.value;
      const foundIndex = arr.findIndex((x) => x.id === id);
      arr.splice(foundIndex, 1);
      state.value = arr;
    },
    deleteRemindersAction: (state, action) => {
      const { selectedDate } = action.payload;
      let arr = state.value;
      const toDelete = arr.filter((reminder) => {
        return isSameDay(Date.parse(reminder.selectedDate), selectedDate);
      });

      toDelete.forEach(function (arrayItem) {
        const foundIndex = arr.findIndex((x) => x.id === arrayItem.id);
        arr.splice(foundIndex, 1);
      });
      state.value = arr;
    },
  },
});

export const {
  addReminderAction,
  deleteReminderAction,
  deleteRemindersAction,
} = calendarSlice.actions;

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched
export const addReminderAsync = (payload) => (dispatch) => {
  setTimeout(() => {
    dispatch(addReminderAction(payload));
  }, 1000);
};

// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectReminders = (state) => state.reminders.value;

export default calendarSlice.reducer;
