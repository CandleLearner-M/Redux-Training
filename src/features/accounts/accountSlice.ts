import { AppThunk } from "../../types/types";

interface StateAccount {
  balance: number;
  loanAmount: number;
  loanPurpose: string;
  isLoading: boolean;
}

export type AccountAction =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdrawal"; payload: number }
  | {
      type: "account/requestLoan";
      payload: { amount: number; purpose: string };
    }
  | { type: "account/payLoan" }
  | { type: "account/convertingCurrency" };

const initialState: StateAccount = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
  isLoading: false,
};



/*
export default function accountReducer(
  state: StateAccount = initialStateAccount,
  action: AccountAction
) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdrawal":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loanAmount > 0) return state;
      //! LATER
      return {
        ...state,
        loanAmount: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      return {
        ...state,
        loanAmount: 0,
        loanPurpose: "",
        balance: state.balance - state.loanAmount,
      };

    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export function deposit(
  amount: number,
  currency: "USD" | "EUR" | "GBP"
): AccountAction | AppThunk {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async (dispatch, getState) => {
    dispatch({ type: "account/convertingCurrency" });
    // API

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedAmount = data.rates.USD;

    // return the Action
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}
export function withdraw(amount: number): AccountAction {
  return { type: "account/withdrawal", payload: amount };
}
export function requestLoan(amount: number, purpose: string): AccountAction {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
export function payLoan(): AccountAction {
  return { type: "account/payLoan" };
}
*/