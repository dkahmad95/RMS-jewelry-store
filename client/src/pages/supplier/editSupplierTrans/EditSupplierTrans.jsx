import "./editSupplierTrans.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getOneSupplierTrans,
  getSuppliers,
  updateSupplierTrans,
} from "../../../redux/apiCalls";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const EditSupplierTrans = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const sTransId = location.pathname.split("/")[2];
  const navigate = useNavigate();


  const supplierTrans = useSelector(
    (state) => state.supplierTrans.supplierOneTrans
  );
 

  const suppliers = useSelector((state) => state.suppliers.suppliers);
 

  useEffect(() => {
    getOneSupplierTrans(dispatch, sTransId);
    getSuppliers(dispatch);
  }, [dispatch, sTransId]);

  
  const supplierId = supplierTrans.supplierId;

  //

  // get supplierInfo by its id
  const supplierInfo = suppliers.find((id) => id._id === supplierId);


  // EXTRACT ITEMS FROM STRANS
  const extractSupplierItems = (supplierTrans) => {
    if (supplierTrans && supplierTrans.sTrans) {
      return supplierTrans.sTrans.flatMap((item) => item.items);
    }
    return [];
  };
  const supplierItems = extractSupplierItems(supplierTrans);
  const [items, setItems] = useState(supplierItems);

  // Function to handle Items changes and update the state
  const handleEditItems = (e, index) => {
    const { name, value } = e.target;

    // Create a copy of the items array
    const updatedItems = [...items];

    // Update the specific item with the new value
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: value,
    };
    setItems(updatedItems);
  };
  console.log("Items", items);

  // EXTRACT RamliSEC FROM STRANS
  const extractSupplierRamliSec = (supplierTrans) => {
    if (supplierTrans && supplierTrans.sTrans) {
      return supplierTrans.sTrans.flatMap((item) => item.ramliSec);
    }
    return [];
  };
  const supplierRamliSec = extractSupplierRamliSec(supplierTrans);
  const [ramliSec, setRamliSec] = useState(supplierRamliSec);

  // Function to handle ramliSec changes and update the state
  const handleEditramliSec = (e) => {
    setRamliSec((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // EXTRACT CashSec FROM STRANS
  const extractSupplierCashSec = (supplierTrans) => {
    if (supplierTrans && supplierTrans.sTrans) {
      return supplierTrans.sTrans.flatMap((item) => item.cashSec);
    }
    return [];
  };
  const supplierCashSec = extractSupplierCashSec(supplierTrans);
  const [cashSec, setCashSec] = useState(supplierCashSec);

  // Function to handle CashSec changes and update the state
  const handleEditCashSec = (e) => {
    setCashSec((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  console.log("CashSec", cashSec);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sTrans = { items, ramliSec, cashSec };
    const newSupplierTrans = { sTrans };
    console.log(newSupplierTrans);
    dispatch(updateSupplierTrans(newSupplierTrans, sTransId));
    // const newCTrans = { customername, phone, items, total };
    // dispatch(updateCTrans(newCTrans, cTransId));
    navigate("/history/"+ sTransId );
  };
  //   handle date format
  const date = new Date(supplierTrans.createdAt);
  const formattedDate = format(date, "dd/MM/yyyy");
  //   console.log("formattedDate", formattedDate);

  return (
    <div className="editSupplierTrans">
      <form action="" className="editSupplierTrans">
        <div className="editSupplierTransContainer">
          <div className="receiptItems">
            <h2>Hajj-Ali Jewelry</h2>
            <p>Date: {formattedDate} </p>

            <p>Supplier Name: {supplierInfo.suppliername} </p>
            <p>Phone Number: {supplierInfo.phone} </p>
            <table className="editTableSupplier">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Items</th>
                  <th>Weight</th>
                  <th>Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {supplierItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>
                      <input
                        type="text"
                        name="desc"
                        placeholder={item.desc}
                        onChange={(e) => handleEditItems(e, index)}
                      />
                    </td>
                    <td>
                      <select
                        name="item"
                        id="item"
                        placeholder={item.item}
                        onChange={(e) => handleEditItems(e, index)}
                      >
                        <option value="18K">18K</option>
                        <option value="21K">21K</option>
                        <option value="Silver">Silver</option>
                        <option value="Watch">Watch</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="weight"
                        placeholder={item.weight}
                        onChange={(e) => handleEditItems(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="unitPrice"
                        placeholder={item.unitPrice}
                        onChange={(e) => handleEditItems(e, index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="buttomSecEdit">
            <div className="ramliLeftSecEdit">
              {supplierRamliSec.map((item, index) => (
                <div key={item._id}>
                  <div className="totalsEdit">
                    <div className="inputEdit">
                      <label htmlFor="">Total-18K: </label>
                      <input
                        type="text"
                        name="total18KWeight"
                        placeholder={item.total18KWeight}
                        onChange={handleEditramliSec}
                      />
                    </div>
                    <div className="inputEdit">
                      <label htmlFor="">Total-21K: </label>
                      <input
                        type="text"
                        name="total21KWeight"
                        placeholder={item.total21KWeight}
                        onChange={handleEditramliSec}
                      />
                    </div>
                  </div>

                  <div className="totalsEdit">
                    <div className="inputEdit">
                      <label htmlFor="">18k ramli: </label>
                      <input
                        type="text"
                        name="w18KtoRamli"
                        placeholder={item.w18KtoRamli}
                        onChange={handleEditramliSec}
                      />
                    </div>
                    <div className="inputEdit">
                      <label htmlFor="">21k ramli: </label>
                      <input
                        type="text"
                        name="w21KtoRamli"
                        placeholder={item.w21KtoRamli}
                        onChange={handleEditramliSec}
                      />
                    </div>
                  </div>
                  <div className="inputEdit">
                    <label htmlFor="">Ramli Total: </label>
                    <input
                      type="text"
                      name="ramliTotal"
                      placeholder={item.ramliTotal}
                      onChange={handleEditramliSec}
                    />
                  </div>
                  <div className="inputEdit">
                    <label htmlFor="">Ramli Old Balance: </label>
                    <input
                      type="text"
                      name="ramliOldBal"
                      placeholder={item.ramliOldBal}
                      onChange={handleEditramliSec}
                    />
                  </div>
                  <div className="inputEdit">
                    <label htmlFor="">Ramli Final Balance: </label>
                    <input
                      type="text"
                      name="ramliFinalBal"
                      placeholder={item.ramliFinalBal}
                      onChange={handleEditramliSec}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="cashRightSecEdit">
              {supplierCashSec.map((item) => (
                <>
                  <div className="inputEdit">
                    <label htmlFor="">Total: </label>
                    <input
                      type="text"
                      name="cashTotal"
                      placeholder={item.cashTotal}
                      onChange={handleEditCashSec}
                    />
                  </div>
                  <div className="inputEdit">
                    <label htmlFor="">Old Balance: </label>
                    <input
                      type="text"
                      name="cashOldBal"
                      placeholder={item.cashOldBal}
                      onChange={handleEditCashSec}
                    />
                  </div>
                  <div className="inputEdit">
                    <label htmlFor="">Final Balance: </label>
                    <input
                      type="text"
                      name="cashFinalBal"
                      placeholder={item.cashFinalBal}
                      onChange={handleEditCashSec}
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <button className="submitEditSupplier" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditSupplierTrans;
