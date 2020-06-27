import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const { addReminderAction } = calendarSlice.actions;

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectReminders = (state) => state.reminders.value;

export default calendarSlice.reducer;
