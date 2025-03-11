import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";


const store = configureStore({
  reducer: {
    customer: customerReducer,
    account: accountReducer, 
  }
})


export default store; 