import { configureStore, combineReducers  } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import cTransReducer from "./cTransRedux";
import suppliersReducer from "./suppliersRedux";
import supplierTransReducer from "./supplierTransRedux";
import expensesReducer from "./expensesRedux";
import overallReducer from "./overallRedux";
import thunk from 'redux-thunk';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";



const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  cTrans: cTransReducer,
  suppliers: suppliersReducer,
  supplierTrans : supplierTransReducer,
  expenses: expensesReducer,
  overall: overallReducer
 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export let persistor = persistStore(store);