import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // Get expenses
    getExpensesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getExpensesSuccess: (state, action) => {
      state.isFetching = false;
      state.expenses = action.payload;
    },
    getExpensesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getExpensesClean: (state) => {
      state.expenses= []
    },
    // Delete expenses
   deleteExpensesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
   deleteExpensesSuccess: (state, action) => {
      state.isFetching = false;
      state.expenses.splice(
        state.expenses.findIndex((item)=> item._id === action.payload),1
      );
    },
   deleteExpensesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Update expenses 
    updateExpensesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateExpensesSuccess: (state, action) => {
      state.isFetching = false;
      state.expenses[state.expenses.findIndex((item)=> item._id === action.payload.id)] = action.payload.expenses
    },
    updateExpensesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Create expenses
    addExpensesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addExpensesSuccess: (state, action) => {
      state.isFetching = false;
      state.expenses.push(action.payload)
    },
    addExpensesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
   
  },
});

export const {  getExpensesStart, getExpensesSuccess, getExpensesFailure,getExpensesClean, deleteExpensesStart, deleteExpensesSuccess, deleteExpensesFailure ,updateExpensesStart, updateExpensesSuccess, updateExpensesFailure  ,addExpensesStart, addExpensesSuccess, addExpensesFailure} = expensesSlice.actions;
export default expensesSlice.reducer;