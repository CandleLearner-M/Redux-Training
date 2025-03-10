import { useSelector } from "react-redux";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import { RootState } from "./store";

function App() {
  const customer = useSelector((store: RootState) => store.customer.fullName);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!customer && <CreateCustomer />}

      {customer && (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
