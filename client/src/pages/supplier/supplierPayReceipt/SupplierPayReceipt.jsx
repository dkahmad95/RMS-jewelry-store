import { useSelector } from "react-redux"
import "./supplierPayReceipt.css"
import { format } from "date-fns"
import { useRef } from "react";
import ReactToPrint from "react-to-print";

const SupplierPayReceipt = () => {
    const componentRef = useRef();

    const supplierPay = useSelector((state)=> state.supplierPay.supplierOnePay)
    console.log("supplierPay",supplierPay)


    const supplier = useSelector((state)=> state.suppliers.oneSupplier)
    console.log("supplier",supplier)

    //   handle date format
    const date = new Date(supplierPay.createdAt);
    const formattedDate = format(date, "dd/MM/yyyy");

  return (
    <div className='supplierPayReceipt'>
        <div className="supplierPayReceiptContainer"  ref={componentRef}>
        <div className="receiptsupplierPayTitle">
        <h1>{supplier.suppliername}'s Payment</h1>
        <h3>Phone: {supplier.phone}</h3>
        <h3>Date: {formattedDate}</h3>
      </div>
      <div className="receiptsupplierPayContainer">
        <div className="receiptsupplierPayLeft">
          <div className="receiptleftContent">
            <span className="receiptramliFinalBal">
              <b>Ramli Balance: {supplierPay.oldRamliBal} g</b>
            </span>
          </div>
          <div className="receiptleftContent">
          

            <div className="receiptpaymentContainer">
            
              <span>18K: {supplierPay.weight18K} g</span>
              <span><b> Ramli: {supplierPay.ramli18K} g</b></span>
            </div>
            
          </div>
         
          <div className="receiptleftContent">
            <div className="receiptpaymentContainer">
           
            <span>21K: {supplierPay.weight21K} g</span>
              <span><b>Ramli: {supplierPay.ramli21K} g</b></span>
            </div>
          </div>
          <div className="receiptleftContent">
            <div className="receiptpaymentContainer">
           
              <span>24k: {supplierPay.weight24K} g</span>
              <span> <b> Ramli: {supplierPay.weight24K} g</b></span>
            </div>
          </div>
          <div className="receiptleftContent">
            <div className="receiptpaymentContainer">
           
              <span>Silver: {supplierPay.silver} g</span>
            </div>
          </div>
          <div className="receiptleftContent">
            <div className="receiptpaymentContainer">
            
              <span>Cash: $ {supplierPay.cash}</span>
              
              <span>Ramli: {supplierPay.cashToRamli} g</span>
            </div>
          </div>
          <div className="receiptleftContent">
            <span className="receipttotalRamli">
              <b>Total Ramli: {supplierPay.totalRamli} g</b>
            </span>
          </div>
          <div className="receiptleftContent">
            <span className="receiptnewRamliFinalBal">
              <b>Ramli Final Balance: {supplierPay.finalRamliBal} g</b>
            </span>
          </div>
        </div>
<div className="receiptmiddlediv"></div>
   

        <div className="receiptsupplierPayRight">
          <div className="receiptrightContent">
            <span className="receiptfinalBal">
              <b>Cash Balance: $ {supplierPay.oldCashBal} </b>
            </span>
          </div>

          <div className="receiptrightContent">
            
            <span><b>Payment: $ {supplierPay.cashPayment}</b></span>
          </div>
          <div className="receiptrightContent">
            <span className="receiptnewFinalBal">
              <b>Cash Final Balance: $ {supplierPay.finalCashBal}</b>
            </span>
          </div>
        </div>
      </div>
    </div>
    <ReactToPrint
        trigger={() => <button className="printButton">Print this out!</button>}
        content={() => componentRef.current}
      />
    </div>
  )
}

export default SupplierPayReceipt