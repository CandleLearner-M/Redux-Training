import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";

import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    customer: customerReducer,
    account: accountReducer,
  },
});


export type RootState = ReturnType<typeof rootReducer>;

export default store;
