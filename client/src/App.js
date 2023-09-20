import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Suppliers from "./pages/supplier/suppliers/Suppliers";
import Supplier from "./pages/supplier/editSupplier/EditSupplier";
import NewSupplier from "./pages/supplier/newSupplier/NewSupplier";
import History from "./pages/supplier/history/History";
import NewTransaction from "./pages/cTrans/newTransaction/NewTransaction";
import SupplierTrans from "./pages/supplier/supplierTrans/SupplierTrans";
import SupplierPay from "./pages/supplier/supplierPay/SupplierPay";
import Login from "./pages/login/login";
import CTransReceipt from "./pages/cTrans/cTransReceipt/CTransReceipt";
import EditCTrans from "./pages/cTrans/editCtrans/EditCTrans";
import SupplierTransReceipt from "./pages/supplier/supplierTransReceipt/SupplierTransReceipt";
import EditSupplierTrans from "./pages/supplier/editSupplierTrans/EditSupplierTrans";
import Expenses from "./pages/expenses/Expenses";
import CustomerTransactions from "./pages/cTrans/customerTransactions/CustomerTransactions"
import { useSelector } from "react-redux";
import Orbit from "./pages/orbit/Orbit";
import Administration from "./pages/administration/Administration";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/orbit" element={<Orbit />} />
        <Route path="/" element={!user ? <Navigate to="/login" /> : <Layout />}>
          <Route index element={<Home />} />
          <Route path="/cTransEdit/:cTransId" element={<EditCTrans />} />
          <Route path="/cTransReceipt/:cTransId" element={<CTransReceipt />} />
          <Route path="/customerTransactions" element={<CustomerTransactions />} />
          <Route path="/newTransaction" element={<NewTransaction />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/editSupplier/:supplierId" element={<Supplier />} />
          <Route
            path="/supplierTrans/:supplierId"
            element={<SupplierTrans />}
          />
          <Route
            path="/supplierTransReceipt/:supplierId"
            element={<SupplierTransReceipt />}
          />
          <Route
            path="/editSupplierTrans/:supplierId"
            element={<EditSupplierTrans />}
          />
          <Route path="/supplierPay/:supplierId" element={<SupplierPay />} />
          <Route path="/newSupplier" element={<NewSupplier />} />
          <Route path="/history/:supplierId" element={<History />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/administration" element={<Administration />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
