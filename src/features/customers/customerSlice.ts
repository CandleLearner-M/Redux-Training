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

// type ActionCustomer =
//   | {
//       type: "customer/createCustomer";
//       payload: { fullName: string; nationalID: string; createdAt: string };
//     }
//   | { type: "customer/updateName"; payload: string };

// const initialStateCustomer: StateCustomer = {
//   fullName: "",
//   nationalID: "",
//   createdAt: "",
// };

// export function createCustomer(
//   fullName: string,
//   nationalID: string
// ): ActionCustomer {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName, createdAt: new Date().toISOString(), nationalID },
//   };
// }

// export function updateName(fullName: string): ActionCustomer {
//   return { type: "customer/updateName", payload: fullName };
// }

// export default function customerReducer(
//   state: StateCustomer = initialStateCustomer,
//   action: ActionCustomer
// ): StateCustomer {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };

//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payload,
//       };

//     default:
//       return state;
//   }
// }
