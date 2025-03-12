import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../types/types";

interface StateAccount {
  balance: number;
  loanAmount: number;
  loanPurpose: string;
  isLoading: boolean;
}

const initialState: StateAccount = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action: PayloadAction<number>) {
      state.balance += action.payload;
    },

    withdraw(state, action: PayloadAction<number>) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount: number, purpose: string) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(
        state,
        action: PayloadAction<{ amount: number; purpose: string }>
      ) {
        if (state.loanAmount > 0) return;

        state.loanAmount = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },

    payLoan(state) {
      state.balance -= state.loanAmount;
      state.loanAmount = 0;
      state.loanPurpose = "";
    },

    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const {
  convertingCurrency,
  deposit: depositAction,
  payLoan,
  requestLoan,
  withdraw,
} = accountSlice.actions;

export type DepositAction = {
  type: "account/deposit";
  payload: number;
};

export function deposit(
  amount: number,
  currency: "USD" | "EUR" | "GBP"
): AppThunk {
  return async (dispatch) => {
    if (currency === "USD") {
      dispatch(depositAction(amount));
      return;
    }
    dispatch(convertingCurrency());
    // API

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedAmount = data.rates.USD;

    // return the Action
    dispatch(depositAction(convertedAmount));
  };
}

const accountReducer = accountSlice.reducer;

export default accountReducer;
