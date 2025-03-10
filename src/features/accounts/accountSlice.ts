interface StateAccount {
  balance: number;
  loanAmount: number;
  loanPurpose: string;
}

type AccountAction =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdrawal"; payload: number }
  | {
      type: "account/requestLoan";
      payload: { amount: number; purpose: string };
    }
  | { type: "account/payLoan" };

const initialStateAccount: StateAccount = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
};

export default function accountReducer(
  state: StateAccount = initialStateAccount,
  action: AccountAction
) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
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
    default:
      return state;
  }
}

export function deposit(amount: number): AccountAction {
  return { type: "account/deposit", payload: amount };
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
