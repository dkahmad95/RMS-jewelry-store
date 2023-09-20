import { createSlice } from "@reduxjs/toolkit";

const cTransSlice = createSlice({
  name: "cTrans",
  initialState: {
    cTrans: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // Get CTrans
    getCTransStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCTransSuccess: (state, action) => {
      state.isFetching = false;
      state.cTrans = action.payload;
    },
    getCTransFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getCTransClean: (state) => {
      state.cTrans= []
    },
    // Delete CTrans
   deleteCTransStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
   deleteCTransSuccess: (state, action) => {
      state.isFetching = false;
      state.cTrans.splice(
        state.cTrans.findIndex((item)=> item._id === action.payload),1
      );
    },
   deleteCTransFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Update CTrans 
    updateCTransStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCTransSuccess: (state, action) => {
      state.isFetching = false;
      state.cTrans[state.cTrans.findIndex((item)=> item._id === action.payload.id)] = action.payload.cTrans
    },
    updateCTransFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Create CTrans
    addCTransStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCTransSuccess: (state, action) => {
      state.isFetching = false;
      state.cTrans.push(action.payload)
    },
    addCTransFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
   
  },
});

export const {  getCTransStart, getCTransSuccess, getCTransFailure,getCTransClean, deleteCTransStart, deleteCTransSuccess, deleteCTransFailure ,updateCTransStart, updateCTransSuccess, updateCTransFailure  ,addCTransStart, addCTransSuccess, addCTransFailure} = cTransSlice.actions;
export default cTransSlice.reducer;