import { ThunkAction } from "redux-thunk";
import { RootState, AppDispatch as StoreDispatch } from "../store";
import { AnyAction } from "@reduxjs/toolkit";

// Define thunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type { StoreDispatch as AppDispatch };

import { useDispatch } from "react-redux";
export const useAppDispatch = () => useDispatch<StoreDispatch>();
