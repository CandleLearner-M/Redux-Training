import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../store"; // Adjust path as needed
import { AccountAction } from "../features/accounts/accountSlice";

// Define your thunk action type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AccountAction
>;

// Define dispatch type that understands thunks
export type AppDispatch = ThunkDispatch<RootState, unknown, AccountAction>;
