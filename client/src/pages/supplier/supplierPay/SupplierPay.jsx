import { useDispatch, useSelector } from "react-redux";
import "./supplierPay.css";

import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { addSupplierPay } from "../../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const SupplierPay = () => {
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const [finalCashBal, setFinalCashBal] = useState(0);
  const [finalRamliBal, setFinalRamliBal] = useState(0);
  const [totalRamli, setTotalRamli] = useState(0);
  const [inputs, setInputs] = useState({
    weight18K: 0,
    weight21K: 0,
    weight24K: 0,
    cash: 0,
    cashToRamli: 0,
    cashPayment: 0,
  });
  
  
  const handleInputs = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      setInputs((prev) => {
        return {
          ...prev,
          [name]: parseFloat(value), 
        };
      });
    }
  };
  console.log(inputs)



  const oneSupplier = useSelector((state) => state.suppliers.oneSupplier);
  console.log("oneSupplier", oneSupplier);

  const supplierId = oneSupplier._id
console.log(supplierId)


  const w18KtoRamli = useMemo(() => {
    return ((inputs.weight18K * 750) / 995).toFixed(2);
  }, [inputs.weight18K]);
  
  const w21KtoRamli = useMemo(() => {
    return ((inputs.weight21K * 875) / 995).toFixed(2);
  }, [inputs.weight21K]);


  const calculateCashFinalBal = useCallback(() => {
    let sum = 0;
    const quantity = parseFloat(oneSupplier.cashFinalBal) - parseFloat(inputs.cashPayment);
    if (!isNaN(quantity)) {
      sum += quantity;
    }
    
    setFinalCashBal(parseFloat((sum).toFixed(2)));
  }, [inputs.cashPayment,oneSupplier.cashFinalBal]);
  
  const calculateRamliFinalBal = useCallback(() => {
    let sum = 0;
      const quantity = parseFloat(oneSupplier.ramliFinalBal ) - parseFloat(totalRamli);
      if (!isNaN(quantity)) {
        sum += quantity;
      }
      
   setFinalRamliBal(parseFloat((sum).toFixed(2)));
    }, [totalRamli,oneSupplier.ramliFinalBal]);
    
    
    
    const calculateTotalRamli = useCallback(() => {
      let sum = 0;
      
      const quantity = parseFloat(w18KtoRamli) + parseFloat(w21KtoRamli)+ parseFloat(inputs.weight24K)+ parseFloat(inputs.cashToRamli)
      if (!isNaN(quantity)) {
        sum += quantity;
      }
      
      setTotalRamli(parseFloat((sum).toFixed(2)));
    }, [inputs,w21KtoRamli,w18KtoRamli]);
    
    
    
    useEffect(() => {
      calculateCashFinalBal();
      calculateTotalRamli();
      calculateRamliFinalBal();
    }, [calculateCashFinalBal, calculateTotalRamli, calculateRamliFinalBal]);
    

    
    
    //   handle date format
    const date = new Date();
    const formattedDate = format(date, "dd/MM/yyyy");
    
    const handlSubmit= (e) =>{
      e.preventDefault()
      
      const oldCashBal = parseFloat(oneSupplier.cashFinalBal)
      const oldRamliBal = parseFloat(oneSupplier.ramliFinalBal)
      const ramli18K = parseFloat(w18KtoRamli)
      const ramli21K = parseFloat(w21KtoRamli)

      const newSupplierPay = {...inputs , totalRamli,finalRamliBal,finalCashBal,oldRamliBal,oldCashBal,ramli18K,ramli21K ,supplierId}
    console.log("newSupplierPay",newSupplierPay)
    
    addSupplierPay(dispatch,newSupplierPay)
    navigate("/supplierPayHistory/"+ supplierId)

  }

  return (
    <div className="supplierPay">
      <div className="supplierPayTitle">
        <h1>{oneSupplier.suppliername}'s Payment</h1>
        <h3>Phone: {oneSupplier.phone}</h3>
        <h3>Date: {formattedDate}</h3>
      </div>
      <div className="supplierPayContainer">
        <div className="supplierPayLeft">
          <div className="leftContent">
            <span className="ramliFinalBal">
              <b>Ramli Balance:</b> {oneSupplier.ramliFinalBal} g
            </span>
          </div>
          <div className="leftContent">
            <label>Payment</label>
            <div className="paymentContainer">
            <label>18K</label>
              <input type="text" name="weight18K" placeholder="g"   onChange={handleInputs}/>
              <span><b> Ramli: {w18KtoRamli} g</b></span>
            </div>
          </div>
         
          <div className="leftContent">
            <div className="paymentContainer">
            <label>21K</label>
              <input type="text" name="weight21K" placeholder="g" onChange={handleInputs} />
              <span> <b> Ramli: {w21KtoRamli} g</b></span>
            </div>
          </div>
          <div className="leftContent">
            <div className="paymentContainer">
            <label>24K</label>
              <input type="text" name="weight24K" placeholder="g"   onChange={handleInputs}/>
              
            </div>
          </div>
          <div className="leftContent">
            <div className="paymentContainer">
            <label>Silver</label>
              <input type="text" name="silver" placeholder="g"   onChange={handleInputs}/>
              
            </div>
          </div>
          <div className="leftContent">
            <div className="paymentContainer">
            <label>Cash</label>
              <input type="text" name="cash" placeholder="$" onChange={handleInputs} />
              <input type="text" name="cashToRamli" placeholder="g" onChange={handleInputs} />
              
            </div>
          </div>
          <div className="leftContent">
            <span className="totalRamli">
              <b>Total Ramli: {totalRamli} g</b>
            </span>
          </div>
          <div className="leftContent">
            <span className="newRamliFinalBal">
              <b>Ramli Final Balance: {finalRamliBal} g</b>
            </span>
          </div>
        </div>

        <div className="middlediv"></div>

        <div className="supplierPayRight">
          <div className="rightContent">
            <span className="finalBal">
              <b>Cash Balance:</b> $ {oneSupplier.cashFinalBal}
            </span>
          </div>

          <div className="rightContent">
            <label>Payment </label>
            <input type="text" name="cashPayment" placeholder="In $.." onChange={handleInputs} />
          </div>
          <div className="rightContent">
            <span className="newFinalBal">
              <b>Cash Final Balance: $ {finalCashBal}</b>
            </span>
          </div>
        </div>
      </div>
      <button className="supplierPayAddButton" onClick={handlSubmit}>Create</button>
    </div>
  );
};

export default SupplierPay;
