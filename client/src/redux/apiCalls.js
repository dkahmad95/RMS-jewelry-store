import { publicRequest, userRequest } from "../requestMethodes";
import {  addCTransFailure, addCTransStart, addCTransSuccess, deleteCTransFailure, deleteCTransStart, deleteCTransSuccess, getCTransFailure, getCTransStart, getCTransSuccess, updateCTransFailure, updateCTransStart, updateCTransSuccess } from "./cTransRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { addSuppliersFailure, addSuppliersStart, addSuppliersSuccess, deleteSuppliersStart, deleteSuppliersFailure, getSuppliersFailure, getSuppliersStart, getSuppliersSuccess, deleteSuppliersSuccess, getOneSupplierStart, getOneSupplierSuccess, getOneSupplierFailure } from "./suppliersRedux";
import { addSupplierTransFailure, addSupplierTransStart, addSupplierTransSuccess, deleteSupplierTransFailure, deleteSupplierTransStart, deleteSupplierTransSuccess, getOneSupplierTransFailure, getOneSupplierTransStart, getOneSupplierTransSuccess, getSupplierTransFailure, getSupplierTransStart, getSupplierTransSuccess, updateSupplierTransFailure, updateSupplierTransStart, updateSupplierTransSuccess } from "./supplierTransRedux";

import { addExpensesFailure, addExpensesStart, addExpensesSuccess, deleteExpensesFailure, deleteExpensesStart, deleteExpensesSuccess, getExpensesFailure, getExpensesStart, getExpensesSuccess, updateExpensesFailure, updateExpensesStart, updateExpensesSuccess } from "./expensesRedux";
import { addOverallFailure, addOverallStart, addOverallSuccess, deleteOverallFailure, deleteOverallStart, deleteOverallSuccess, getOverallFailure, getOverallStart, getOverallSuccess, updateOverallFailure, updateOverallStart, updateOverallSuccess } from "./overallRedux";
import { addSupplierPayFailure, addSupplierPayStart, addSupplierPaySuccess, deleteSupplierPayFailure, deleteSupplierPayStart, deleteSupplierPaySuccess, getOneSupplierPayFailure, getOneSupplierPayStart, getOneSupplierPaySuccess, getSupplierPayFailure, getSupplierPayStart, getSupplierPaySuccess, updateSupplierPayFailure, updateSupplierPayStart, updateSupplierPaySuccess } from "./supplierPayRedux";


// LOGIN
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};





//CTRANS APIs

// get all ctrans
export const getCTrans = async (dispatch) => {
  dispatch(getCTransStart());
  try {
    const res = await publicRequest.get("/cTrans");
    dispatch(getCTransSuccess(res.data));
  } catch (err) {
    dispatch(getCTransFailure());
  }
};

// get one ctrans
export const getOneCTrans = async (dispatch,id) => {
  dispatch(getCTransStart());
  try {
    const res = await publicRequest.get('/cTrans/cTrans/'+id);
    dispatch(getCTransSuccess(res.data));
  } catch (err) {
    dispatch(getCTransFailure());
  }
};

// delete one ctrans
export const deleteCTrans = async (dispatch,id) => {
  dispatch(deleteCTransStart());
  try {
     await userRequest.delete(`/cTrans/${id}`);
    dispatch(deleteCTransSuccess(id));
  } catch (err) {
    dispatch(deleteCTransFailure());
  }
};


// add one ctrans
export const addCTrans = async (dispatch , newCTrans) => {
  dispatch(addCTransStart());
  try {
    const res = await userRequest.post(`/cTrans/create` , newCTrans);
    dispatch(addCTransSuccess(res.data));
  } catch (err) {
    dispatch(addCTransFailure());
  }
};



//update using Thunk
export const updateCTrans = (newCTrans, id) => {
  return async (dispatch) => {
    dispatch(updateCTransStart());
    try {
      const res = await userRequest.put(`/cTrans/${id}`, newCTrans);

      dispatch(updateCTransSuccess(res.data));
    } catch (err) {
      dispatch(updateCTransFailure(err));
    }
  };
};






// SUPPLIERS APIs

//get suppliers
export const getSuppliers = async (dispatch)=>{
  dispatch(getSuppliersStart());
  try{
    const res = await publicRequest.get("/supplier");
    dispatch(getSuppliersSuccess(res.data))

  }catch(err){
    dispatch(getSuppliersFailure())
  }
}
//get One suppliers
export const getOneSupplier = async (dispatch, id)=>{
  dispatch(getOneSupplierStart());
  try{
    const res = await publicRequest.get(`/supplier/${id}`);
    dispatch(getOneSupplierSuccess(res.data))

  }catch(err){
    dispatch(getOneSupplierFailure())
  }
}

// Add New Supplier 
export const addSupplier = async (dispatch, supplier)=>{
  dispatch(addSuppliersStart())
  try{
    const res = await userRequest.post("/supplier/create", supplier)
    dispatch(addSuppliersSuccess(res.data))
  }catch(err){
    dispatch(addSuppliersFailure())
  }
}

// delete Supplier 

export const deleteSupplier = async (dispatch , id)=> {
  dispatch(deleteSuppliersStart())
  try{
    await userRequest.delete(`/supplier/${id}`)
    dispatch(deleteSuppliersSuccess(id))
  }catch(err){
    dispatch(deleteSuppliersFailure())
  }
}


//update supplier using Thunk
export const updateSupplier = (newSupplier, id) => {
  return async (dispatch) => {
    dispatch(updateCTransStart());
    try {
      const res = await userRequest.put(`/supplier/${id}`, newSupplier);

      dispatch(updateCTransSuccess(res.data));
    } catch (err) {
      dispatch(updateCTransFailure(err));
    }
  };
};





//SupplierTrans APIs

// get all SupplierTrans
export const getSupplierTrans = async (dispatch , id) => {
  dispatch(getSupplierTransStart());
  try {
    const res = await publicRequest.get(`/supplierTrans/supplier/${id}`);
    dispatch(getSupplierTransSuccess(res.data));
  } catch (err) {
    dispatch(getSupplierTransFailure());
  }
};


// add one SupplierTrans
export const addSupplierTrans = async (dispatch , newSupplierTrans) => {
  dispatch(addSupplierTransStart());
  try {
    const res = await userRequest.post(`/supplierTrans/create` , newSupplierTrans);
    dispatch(addSupplierTransSuccess(res.data));
  } catch (err) {
    dispatch(addSupplierTransFailure());
  }
};

// delete one SupplierTrans
export const deleteSupplierTrans = async (dispatch,id) => {
  dispatch(deleteSupplierTransStart());
  try {
     await userRequest.delete(`/supplierTrans/${id}`);
    dispatch(deleteSupplierTransSuccess(id));
  } catch (err) {
    dispatch(deleteSupplierTransFailure());
  }
};
// get one SupplierTrans
export const getOneSupplierTrans = async (dispatch, id) => {
  dispatch(getOneSupplierTransStart());
  try {
    const res = await publicRequest.get(`/supplierTrans/trans/${id}`);
    dispatch(getOneSupplierTransSuccess(res.data));
  } catch (err) {
    dispatch(getOneSupplierTransFailure());
  }
};

//update supplierTrans using Thunk
export const updateSupplierTrans = (newSupplierTrans, id) => {
  return async (dispatch) => {
    dispatch(updateSupplierTransStart());
    try {
      const res = await userRequest.put(`/supplierTrans/${id}`, newSupplierTrans);

      dispatch(updateSupplierTransSuccess(res.data));
    } catch (err) {
      dispatch(updateSupplierTransFailure(err));
    }
  };
};






//Expenses APIs

// get all Expenses
export const getExpenses = async (dispatch) => {
  dispatch(getExpensesStart());
  try {
    const res = await publicRequest.get(`/expenses/`);
    dispatch(getExpensesSuccess(res.data));
  } catch (err) {
    dispatch(getExpensesFailure());
  }
};

// add one Expenses
export const addExpenses = async (dispatch , newExpenses) => {
  dispatch(addExpensesStart());
  try {
    const res = await userRequest.post(`/expenses/create` , newExpenses);
    dispatch(addExpensesSuccess(res.data));
  } catch (err) {
    dispatch(addExpensesFailure());
  }
};

// delete one Expenses
export const deleteExpenses = async (dispatch,id) => {
  dispatch(deleteExpensesStart());
  try {
     await userRequest.delete(`/expenses/${id}`);
    dispatch(deleteExpensesSuccess(id));
  } catch (err) {
    dispatch(deleteExpensesFailure());
  }
};

//update Expenses using Thunk
export const updateExpenses = (newExpenses, id) => {
  return async (dispatch) => {
    dispatch(updateExpensesStart());
    try {
      // Make the API request to update the Expenses
      const res = await userRequest.put(`/expenses/${id}`, newExpenses);

      
      dispatch(updateExpensesSuccess(res.data));
    } catch (err) {
      
      dispatch(updateExpensesFailure(err));
    }
  };
};




//Overall APIs

// get all Overall
export const getOverall = async (dispatch) => {
  dispatch(getOverallStart());
  try {
    const res = await publicRequest.get(`/overall/`);
    dispatch(getOverallSuccess(res.data));
  } catch (err) {
    dispatch(getOverallFailure());
  }
};

// add one Overall
export const addOverall = async (dispatch , newOverall) => {
  dispatch(addOverallStart());
  try {
    const res = await userRequest.post(`/overall/create` , newOverall);
    dispatch(addOverallSuccess(res.data));
  } catch (err) {
    dispatch(addOverallFailure());
  }
};

// delete one Overall
export const deleteOverall = async (dispatch,id) => {
  dispatch(deleteOverallStart());
  try {
     await userRequest.delete(`/overall/${id}`);
    dispatch(deleteOverallSuccess(id));
  } catch (err) {
    dispatch(deleteOverallFailure());
  }
};

//update Overall using Thunk
export const updateOverall = (newOverall, id) => {
  return async (dispatch) => {
    dispatch(updateOverallStart());
    try {
      // Make the API request to update the Overall
      const res = await userRequest.put(`/overall/${id}`, newOverall);

      
      dispatch(updateOverallSuccess(res.data));
    } catch (err) {
      
      dispatch(updateOverallFailure(err));
    }
  };
};




//SupplierPay APIs

// get all SupplierPay
export const getSupplierPay = async (dispatch, id) => {
  dispatch(getSupplierPayStart());
  try {
    const res = await publicRequest.get(`/SupplierPay/supplier/${id}`);
    dispatch(getSupplierPaySuccess(res.data));
  } catch (err) {
    dispatch(getSupplierPayFailure());
  }
};

// add one SupplierPay
export const addSupplierPay = async (dispatch , newSupplierPay) => {
  dispatch(addSupplierPayStart());
  try {
    const res = await userRequest.post(`/SupplierPay/create` , newSupplierPay);
    dispatch(addSupplierPaySuccess(res.data));
  } catch (err) {
    dispatch(addSupplierPayFailure());
  }
};

// delete one SupplierPay
export const deleteSupplierPay = async (dispatch,id) => {
  dispatch(deleteSupplierPayStart());
  try {
     await userRequest.delete(`/SupplierPay/${id}`);
    dispatch(deleteSupplierPaySuccess(id));
  } catch (err) {
    dispatch(deleteSupplierPayFailure());
  }
};

// get one SupplierPay
export const getOneSupplierPay = async (dispatch, id) => {
  dispatch(getOneSupplierPayStart());
  try {
    const res = await publicRequest.get(`/SupplierPay/pay/${id}`);
    dispatch(getOneSupplierPaySuccess(res.data));
  } catch (err) {
    dispatch(getOneSupplierPayFailure());
  }
};

//update SupplierPay using Thunk
export const updateSupplierPay = (newSupplierPay, id) => {
  return async (dispatch) => {
    dispatch(updateSupplierPayStart());
    try {
      const res = await userRequest.put(`/SupplierPay/${id}`, newSupplierPay);

      dispatch(updateSupplierPaySuccess(res.data));
    } catch (err) {
      dispatch(updateSupplierPayFailure(err));
    }
  };
};