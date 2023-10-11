import "./supplierTransReceipt.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneSupplierTrans, getSuppliers } from "../../../redux/apiCalls";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const SupplierTransReceipt = () => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const location = useLocation();
  const sTransId = location.pathname.split("/")[2];

  const supplierOneTrans = useSelector(
    (state) => state.supplierTrans.supplierOneTrans
  );
  console.log("supplierOneTrans", supplierOneTrans)

  const suppliers = useSelector((state) => state.suppliers.oneSupplier);

  useEffect(() => {
    getOneSupplierTrans(dispatch, sTransId);
    getSuppliers(dispatch);
  }, [dispatch, sTransId]);

  const supplierId = supplierOneTrans.supplierId;

  // // get supplierInfo by its id
  // const supplierInfo = suppliers.find((id) => id._id === supplierId);

  // EXTRACT ITEMS FROM STRANS
  const extractSupplierItems = (supplierTrans) => {
    if (supplierTrans && supplierTrans.sTrans) {
      return supplierTrans.sTrans.flatMap((item) => item.items);
    }
    return [];
  };
  const supplierItems = extractSupplierItems(supplierOneTrans);

  // EXTRACT RamliSEC FROM STRANS
  const extractSupplierRamliSec = (supplierTrans) => {
    if (supplierTrans && supplierTrans.sTrans) {
      return supplierTrans.sTrans.flatMap((item) => item.ramliSec);
    }
    return [];
  };
  const supplierRamliSec = extractSupplierRamliSec(supplierOneTrans);
  

  // EXTRACT CashSec FROM STRANS
  const extractSupplierCashSec = (supplierTrans) => {
    if (supplierTrans && supplierTrans.sTrans) {
      return supplierTrans.sTrans.flatMap((item) => item.cashSec);
    }
    return [];
  };
  const supplierCashSec = extractSupplierCashSec(supplierOneTrans);
  console.log("supplierCashSec", supplierCashSec);

  //   handle date format
  const date = new Date(supplierOneTrans.createdAt);
  const formattedDate = format(date, "dd/MM/yyyy");

  return (
    <div className="supplierTransReceipt">
      <div className="supplierTransReceiptContainer" ref={componentRef}>
        <div className="receiptItems">
          <h2>Hajj-Ali Jewelry</h2>
          <p>Date: {formattedDate} </p>
          <p>Supplier Name: {suppliers.suppliername} </p>
          <p>Phone Number: {suppliers.phone} </p>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Item</th>
                <th>Weight</th>
                <th>Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {supplierItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.desc}</td>
                  <td>{item.item}</td>
                  <td>{item.weight} g</td>
                  <td>${item.unitPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="buttomSec">
          <div className="ramliLeftSec">
            {supplierRamliSec.map((item) => (
              <>
                <div className="totals">
                  <span>
                    <b>Total-18K:</b> {item.total18KWeight} g
                  </span>
                  <span>
                    <b>Total-21K:</b> {item.total21KWeight} g
                  </span>
                </div>

                <div className="totals">
                  <span>
                    <b>18k ramli:</b> {item.w18KtoRamli} g
                  </span>
                  <span>
                    <b>21k ramli:</b> {item.w21KtoRamli} g
                  </span>
                </div>
                <span>
                  <b>24k:</b> {item.total24KWeight} g
                </span>
                <span>
                  <b> Ramli Total:</b> {item.ramliTotal} g
                </span>

                <span>
                  <b> Ramli Old Balance:</b> {(item.ramliOldBal).toFixed(2)} g
                </span>

                <span>
                  <b> Ramli Final Balance:</b> {item.ramliFinalBal} g
                </span>
              </>
            ))}
          </div>

          <div className="cashRightSec">
            {supplierCashSec.map((item) => (
              <>
                <span>
                  <b>Total 18K:</b> $ {item.total18K}
                </span>
                <span>
                  <b>Total 21K:</b> $ {item.total21K}
                </span>
                <span>
                  <b>Total 24K:</b> $ {item.total24K}
                </span>
                <span>
                  <b>Total:</b> $ {item.cashTotal}
                </span>

                <span>
                  <b>Old Balance:</b> $ {item.cashOldBal}
                </span>

                <span>
                  <b>Final Balance:</b> $ {item.cashFinalBal}
                </span>
              </>
            ))}
          </div>
        </div>
      </div>
      <ReactToPrint
        trigger={() => <button className="printButton">Print this out!</button>}
        content={() => componentRef.current}
      />
    </div>
  );
};

export default SupplierTransReceipt;
