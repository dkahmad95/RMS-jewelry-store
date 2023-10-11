import { createSlice } from "@reduxjs/toolkit";

const supplierPaySlice = createSlice({
  name: "supplierPay",
  initialState: {
    supplierPay: [],
    supplierOnePay: [],
    isFetching: false,
    error: false,
    supplierOnePayIsFetching: false,
    supplierOnePayError: false,
  },
  reducers: {
    // Get supplierPay
    getSupplierPayStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getSupplierPaySuccess: (state, action) => {
      state.isFetching = false;
      state.supplierPay = action.payload;
    },
    getSupplierPayFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getSupplierPayClean: (state) => {
      state.supplierPay = [];
    },
    // Get One supplierPay
    getOneSupplierPayStart: (state) => {
      state.supplierOnePayIsFetching = true;
      state.supplierOnePayError = false;
    },
    getOneSupplierPaySuccess: (state, action) => {
      state.supplierOnePayIsFetching = false;
      state.supplierOnePay = action.payload;
    },
    getOneSupplierPayFailure: (state) => {
      state.supplierOnePayIsFetching = false;
      state.supplierOnePayError = true;
    },
    // Delete supplierPay
    deleteSupplierPayStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteSupplierPaySuccess: (state, action) => {
      state.isFetching = false;
      state.supplierPay.splice(
        state.supplierPay.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteSupplierPayFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Update supplierPay
    updateSupplierPayStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateSupplierPaySuccess: (state, action) => {
      state.isFetching = false;
      state.supplierPay[
        state.supplierPay.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.supplierPay;
    },
    updateSupplierPayFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Create supplierPay
    addSupplierPayStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addSupplierPaySuccess: (state, action) => {
      state.isFetching = false;
      state.supplierPay.push(action.payload);
    },
    addSupplierPayFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getSupplierPayStart,
  getSupplierPaySuccess,
  getSupplierPayFailure,
  getSupplierPayClean,

  getOneSupplierPayStart,
  getOneSupplierPaySuccess,
  getOneSupplierPayFailure,

  deleteSupplierPayStart,
  deleteSupplierPaySuccess,
  deleteSupplierPayFailure,
  updateSupplierPayStart,
  updateSupplierPaySuccess,
  updateSupplierPayFailure,
  addSupplierPayStart,
  addSupplierPaySuccess,
  addSupplierPayFailure,
} = supplierPaySlice.actions;
export default supplierPaySlice.reducer;
