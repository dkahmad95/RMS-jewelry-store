import { createSlice } from "@reduxjs/toolkit";

const overallSlice = createSlice({
  name: "overall",
  initialState: {
    overall: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // Get overall
    getOverallStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOverallSuccess: (state, action) => {
      state.isFetching = false;
      state.overall = action.payload;
    },
    getOverallFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getOverallClean: (state) => {
      
      state.overall = [];
    },
    // Delete overall
   deleteOverallStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
   deleteOverallSuccess: (state, action) => {
      state.isFetching = false;
      state.overall.splice(
        state.overall.findIndex((item)=> item._id === action.payload),1
      );
    },
   deleteOverallFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Update overall 
    updateOverallStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateOverallSuccess: (state, action) => {
      state.isFetching = false;
      state.overall[state.overall.findIndex((item)=> item._id === action.payload.id)] = action.payload.overall
    },
    updateOverallFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Create overall
    addOverallStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addOverallSuccess: (state, action) => {
      state.isFetching = false;
      state.overall.push(action.payload)
    },
    addOverallFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
   
  },
});

export const {  getOverallStart, getOverallSuccess, getOverallFailure,getOverallClean, deleteOverallStart, deleteOverallSuccess, deleteOverallFailure ,updateOverallStart, updateOverallSuccess, updateOverallFailure  ,addOverallStart, addOverallSuccess, addOverallFailure} = overallSlice.actions;
export default overallSlice.reducer;