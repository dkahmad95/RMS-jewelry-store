import { createSlice } from "@reduxjs/toolkit";

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState: {
    suppliers: [],
    oneSupplier: {},
    isFetching: false,
    error: false,
    oneSupplierisFetching: false,
    oneSuppliererror: false,
  },
  reducers: {
    // Get suppliers
    getSuppliersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getSuppliersSuccess: (state, action) => {
      state.isFetching = false;
      state.suppliers = action.payload;
    },
    getSuppliersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Get One supplier
    getOneSupplierStart: (state) => {
      state.oneSupplierisFetching = true;
      state.oneSuppliererror = false;
    },
    getOneSupplierSuccess: (state, action) => {
      state.oneSupplierisFetching = false;
      state.oneSupplier = action.payload;
    },
    getOneSupplierFailure: (state) => {
      state.oneSupplierisFetching = false;
      state.oneSuppliererror = true;
    },

    // Delete suppliers
    deleteSuppliersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteSuppliersSuccess: (state, action) => {
      state.isFetching = false;
      state.suppliers.splice(
        state.suppliers.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteSuppliersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Update suppliers
    updateSuppliersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateSuppliersSuccess: (state, action) => {
      state.isFetching = false;
      state.suppliers[
        state.suppliers.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.suppliers;
    },
    updateSuppliersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Create suppliers
    addSuppliersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addSuppliersSuccess: (state, action) => {
      state.isFetching = false;
      state.suppliers.push(action.payload);
    },
    addSuppliersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getSuppliersStart,
  getSuppliersSuccess,
  getSuppliersFailure,
  getOneSupplierStart,
  getOneSupplierSuccess,
  getOneSupplierFailure,
  getSuppliersClean,
  deleteSuppliersStart,
  deleteSuppliersSuccess,
  deleteSuppliersFailure,
  updateSuppliersStart,
  updateSuppliersSuccess,
  updateSuppliersFailure,
  addSuppliersStart,
  addSuppliersSuccess,
  addSuppliersFailure,
} = suppliersSlice.actions;
export default suppliersSlice.reducer;
