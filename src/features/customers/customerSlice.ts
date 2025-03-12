import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateCustomer = {
  fullName: string;
  nationalID: string;
  createdAt: string;
};

const initialState: StateCustomer = {
  createdAt: "",
  fullName: "",
  nationalID: "",
};

const customerSlice = createSlice({
  initialState,
  name: "customer",
  reducers: {
    createCustomer: {
      prepare(fullName: string, nationalId: string) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(
        state,
        action: PayloadAction<{
          fullName: string;
          nationalId: string;
          createdAt: string;
        }>
      ) {
        state.createdAt = action.payload.createdAt;
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalId;
      },
    },
    updateName(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
    },
  },
});


export const {createCustomer, updateName} = customerSlice.actions;

const customerReducer = customerSlice.reducer;


export default customerReducer; 

