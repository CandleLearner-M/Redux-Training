import { combineReducers, createStore } from "redux";

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

function accountReducer(
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

// store.dispatch({ type: "account/deposit", payload: 500 });

// console.log(store.getState());

// store.dispatch({ type: "account/withdrawal", payload: 500 });

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 2000, purpose: "buy a car" },
// });

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

function deposit(amount: number): AccountAction {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount: number): AccountAction {
  return { type: "account/withdrawal", payload: amount };
}
function requestLoan(amount: number, purpose: string): AccountAction {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
function payLoan(): AccountAction {
  return { type: "account/payLoan" };
}

type StateCustomer = {
  fullName: string;
  nationalID: string;
  createdAt: string;
};

type ActionCustomer =
  | {
      type: "customer/createCustomer";
      payload: { fullName: string; nationalID: string; createdAt: string };
    }
  | { type: "customer/updateName"; payload: string };

const initialStateCustomer: StateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function createCustomer(fullName: string, nationalID: string): ActionCustomer {
  return {
    type: "customer/createCustomer",
    payload: { fullName, createdAt: new Date().toISOString(), nationalID },
  };
}

function updateName(fullName: string): ActionCustomer {
  return { type: "customer/updateName", payload: fullName };
}

function customerReducer(
  state: StateCustomer = initialStateCustomer,
  action: ActionCustomer
): StateCustomer {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

store.dispatch(createCustomer("Mostafa El Issati", "K631014"));
store.dispatch(deposit(70_000));
console.log(store.getState());
