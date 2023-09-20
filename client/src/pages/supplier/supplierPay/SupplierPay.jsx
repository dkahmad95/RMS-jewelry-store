import { useSelector } from "react-redux";
import "./supplierPay.css";
import { useLocation} from "react-router-dom";
import { format } from "date-fns";

const SupplierPay = () => {
  

  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const location = useLocation();
  const supplierId = location.pathname.split("/")[2];
  const mySupplierId = suppliers.find((item) => item._id === supplierId);

  //   handle date format
  const date = new Date();
  const formattedDate = format(date, "dd/MM/yyyy");



  return (
    <div className="supplierPay">


      <h1 className="supplierPayTitle">Supplier Payment</h1>
      <div className="supplierInfo">

      <h2>Name: {mySupplierId.suppliername}</h2>
      <h2>Phone: {mySupplierId.phone}</h2>
      <h2>Date: {formattedDate}</h2>
      </div>
      <div className="supplierPayContainer">
        <div className="supplierPayLeft">
          <div className="leftContent">
            <span className="ramliFinalBal">
              <b>Ramli Balance:</b> {mySupplierId.ramliFinalBal} g
            </span>
          </div>
          <div className="leftContent">
            <label>Payment</label>
            <input type="text" className="18K" placeholder="18K" />
          </div>
          <div className="leftContent">
            <input type="text" className="21K" placeholder="21K" />
          </div>
          <div className="leftContent">
            <input type="text" className="cash" placeholder="Ramli" />
          </div>
          <div className="leftContent">
            <span className="newRamliFinalBal">
              <b>Ramli Final Balance:</b>
            </span>
          </div>
        </div>

        <div className="middlediv"></div>

        <div className="supplierPayRight">
          <div className="rightContent">
            <span className="finalBal">
              <b>Cash Balance:</b> ${mySupplierId.cashFinalBal}
            </span>
          </div>

          <div className="rightContent">
            <label>Payment </label>
            <input type="text" className="cash" placeholder="In $.." />
          </div>
          <div className="rightContent">
            <span className="newFinalBal">
              <b>Cash Final Balance:</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierPay;
