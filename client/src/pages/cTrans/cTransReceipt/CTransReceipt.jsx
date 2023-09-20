import { useDispatch, useSelector } from "react-redux";
import "./cTransReceipt.css";
import { getCTrans } from "../../../redux/apiCalls";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const CTransReceipt = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cTransId = location.pathname.split("/")[2];
  const componentRef = useRef();

  const cTrans = useSelector((state) => state.cTrans.cTrans);

  useEffect(() => {
    getCTrans(dispatch);
  }, [dispatch]);
  console.log(cTrans);
  console.log(typeof cTrans);
  const myCTransId = cTrans.find((item) => item._id === cTransId);
  console.log(myCTransId);
  console.log(typeof myCTransId);
  console.log(myCTransId.items);

  const currentDate = new Date(myCTransId.createdAt);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  return (
    <div className="cTransReceipt">
      <div className="recipteWrapper">
      
        <div className="cTransReceiptContainer" ref={componentRef}>
          <h2>Hajj-Ali Jewelry</h2>
          <p>Date: {formattedDate}</p>
          <p>Customer Name: {myCTransId.customername}</p>
          <p>Phone Number: {myCTransId.phone}</p>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Item</th>
                <th>Weight</th>
                <th>Unit Price</th>
                <th>Item Total</th>
              </tr>
            </thead>
            <tbody>
              {myCTransId.items.map((item) => (
                <tr key={item._id}>
                  <td>{item.desc}</td>
                  <td>{item.item}</td>
                  <td>{item.weight} g</td>
                  <td>${item.unitPrice}</td>
                  <td>${item.itemTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total: ${myCTransId.total}</p>
        </div>
              <ReactToPrint
                trigger={() => (
                  <button className="printButton">Print this out!</button>
                )}
                content={() => componentRef.current}/>
      </div>
    </div>
  );
};

export default CTransReceipt;
