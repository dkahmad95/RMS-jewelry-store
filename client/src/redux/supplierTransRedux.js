import { createSlice } from "@reduxjs/toolkit";

const supplierTransSlice = createSlice({
  name: "supplierTrans",
  initialState: {
    supplierTrans: [],
    supplierOneTrans: [],
    isFetching: false,
    error: false,
    supplierOneTransIsFetching: false,
    supplierOneTransError: false,
  },
  reducers: {
    // Get supplierTrans
    getSupplierTransStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getSupplierTransSuccess: (state, action) => {
      state.isFetching = false;
      state.supplierTrans = action.payload;
    },
    getSupplierTransFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getSupplierTransClean: (state) => {
      state.supplierTrans= []
    },
    // Get One supplierTrans
    getOneSupplierTransStart: (state) => {
      state.supplierOneTransIsFetching = true;
      state.supplierOneTransError = false;
    },
    getOneSupplierTransSuccess: (state, action) => {
      state.supplierOneTransIsFetching = false;
      state.supplierOneTrans = action.payload;
    },
    getOneSupplierTransFailure: (state) => {
      state.supplierOneTransIsFetching = false;
      state.supplierOneTransError = true;
    },
    // Delete supplierTrans
   deleteSupplierTransStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
   deleteSupplierTransSuccess: (state, action) => {
      state.isFetching = false;
      state.supplierTrans.splice(
        state.supplierTrans.findIndex((item)=> item._id === action.payload),1
      );
    },
   deleteSupplierTransFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Update supplierTrans 
    updateSupplierTransStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateSupplierTransSuccess: (state, action) => {
      state.isFetching = false;
      state.supplierTrans[state.supplierTrans.findIndex((item)=> item._id === action.payload.id)] = action.payload.supplierTrans
    },
    updateSupplierTransFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Create supplierTrans
    addSupplierTransStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addSupplierTransSuccess: (state, action) => {
      state.isFetching = false;
      state.supplierTrans.push(action.payload)
    },
    addSupplierTransFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
   
  },
});

export const {  getSupplierTransStart, getSupplierTransSuccess, getSupplierTransFailure,getSupplierTransClean,

  getOneSupplierTransStart, getOneSupplierTransSuccess, getOneSupplierTransFailure, 
  
   deleteSupplierTransStart, deleteSupplierTransSuccess, deleteSupplierTransFailure ,updateSupplierTransStart, updateSupplierTransSuccess, updateSupplierTransFailure  ,addSupplierTransStart, addSupplierTransSuccess, addSupplierTransFailure} = supplierTransSlice.actions;
export default supplierTransSlice.reducer;