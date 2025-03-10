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

export function createCustomer(
  fullName: string,
  nationalID: string
): ActionCustomer {
  return {
    type: "customer/createCustomer",
    payload: { fullName, createdAt: new Date().toISOString(), nationalID },
  };
}

export function updateName(fullName: string): ActionCustomer {
  return { type: "customer/updateName", payload: fullName };
}

export default function customerReducer(
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
