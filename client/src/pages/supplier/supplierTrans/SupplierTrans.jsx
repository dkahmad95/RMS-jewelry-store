import { useLocation, useNavigate } from "react-router-dom";
import "./supplierTrans.css";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSupplierTrans, updateSupplier } from "../../../redux/apiCalls";

const SupplierTrans = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const supplierId = location.pathname.split("/")[2];
  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const mySupplierById = suppliers.find((item) => item._id === supplierId);
  const ramliOldBal = mySupplierById.ramliFinalBal;

  const cashOldBal = mySupplierById.cashFinalBal;

  const addForm = () => {
    const newForm = {
      item: "18K",
      weight: "",
      desc: "",
      unitPrice: "",
    };

    setItems([...items, newForm]);
  };

  const handleInputChange = useCallback(
    (event, formIndex) => {
      const updateditems = [...items];
      updateditems[formIndex][event.target.name] = event.target.value;
      setItems(updateditems);
    },
    [items]
  );

  const calculateTotal = useCallback(() => {
    let sum = 0;
    items.forEach((item) => {
      const quantity = parseFloat(item.weight) * parseFloat(item.unitPrice);
      if (!isNaN(quantity)) {
        sum += quantity;
      }
    });
    setTotal((sum).toFixed(2));
  }, [items]);

  const total18KWeight = useMemo(() => {
    let total18KWeight = 0;
    for (const item of items) {
      const weight = parseFloat(item.weight);

      if (!isNaN(weight) && item.item === "18K") {
        total18KWeight += weight;
      }
    }
    return total18KWeight.toFixed(2);
  }, [items]);

  const total21KWeight = useMemo(() => {
    let total21KWeight = 0;
    for (const item of items) {
      const weight = parseFloat(item.weight);

      if (!isNaN(weight) && item.item === "21K") {
        total21KWeight += weight;
      }
    }
    return total21KWeight.toFixed(2);
  }, [items]);


  const total24KWeight = useMemo(() => {
    let total24KWeight = 0;
    for (const item of items) {
      const weight = parseFloat(item.weight);

      if (!isNaN(weight) && item.item === "24K") {
        total24KWeight += weight;
      }
    }
    return total24KWeight.toFixed(2);
  }, [items]);

  const silverWeight = useMemo(() => {
    let silverWeight = 0;
    for (const item of items) {
      const total = parseFloat(item.weight);

      if (!isNaN(total) && item.item === "Silver") {
        silverWeight += total;
      }
    }
    return silverWeight.toFixed(2);
  }, [items]);

  
  const total18K = useMemo(() => {
    let total18K = 0;
    for (const item of items) {
      const total = parseFloat(item.weight)* parseFloat(item.unitPrice);

      if (!isNaN(total) && item.item === "18K") {
        total18K += total;
      }
    }
    return total18K.toFixed(2);
  }, [items]);

  const total21K = useMemo(() => {
    let total21K = 0;
    for (const item of items) {
      const total = parseFloat(item.weight)* parseFloat(item.unitPrice);

      if (!isNaN(total) && item.item === "21K") {
        total21K += total;
      }
    }
    return total21K.toFixed(2);
  }, [items]);


  const total24K = useMemo(() => {
    let total24K = 0;
    for (const item of items) {
      const total = parseFloat(item.weight)* parseFloat(item.unitPrice);

      if (!isNaN(total) && item.item === "24K") {
        total24K += total;
      }
    }
    return total24K.toFixed(2);
  }, [items]);



  const w18KtoRamli = useMemo(() => {
    return ((total18KWeight * 750) / 995).toFixed(2);
  }, [total18KWeight]);

  const w21KtoRamli = useMemo(() => {
    return ((total21KWeight * 875) / 995).toFixed(2);
  }, [total21KWeight]);
  

  const ramliTotal = useMemo(() => {
    return (parseFloat(w18KtoRamli) + parseFloat(w21KtoRamli)+ parseFloat(total24KWeight)).toFixed(2);
  }, [w18KtoRamli, w21KtoRamli,total24KWeight]);

  const ramliFinalBal = useMemo(() => {
    return( parseFloat(ramliOldBal) + parseFloat(ramliTotal)).toFixed(2);
  }, [ramliOldBal, ramliTotal]);

  const finalBalance = useMemo(() => {
    return (parseFloat(cashOldBal) + parseFloat(total)).toFixed(2);
  }, [cashOldBal, total]);

  useEffect(() => {
    calculateTotal();
  }, [items, calculateTotal]);

  const handleAddTrans = (e) => {
    e.preventDefault();
    const ramliSec = {
      total18KWeight,
      total21KWeight,
      total24KWeight,
      w18KtoRamli,
      w21KtoRamli,
      ramliTotal,
      ramliOldBal,
      ramliFinalBal,
    };
    const cashTotal = total;
    
    const totalSilver = silverWeight
    const cashFinalBal = finalBalance;
    const cashSec = { total18K,total21K,total24K,cashTotal, cashOldBal, cashFinalBal };
    const sTrans = { items, ramliSec, cashSec ,totalSilver};
    const newSupplierTrans = { supplierId, sTrans };

    const newFinalBalAndRamli = {ramliFinalBal,cashFinalBal}

    addSupplierTrans(dispatch, newSupplierTrans)
    dispatch(updateSupplier(newFinalBalAndRamli,supplierId))
  
    navigate("/history/"+ supplierId)
  };

  return (
    <div className="supplierTrans">
      <div className="SThistoryListTitle">
        <h1>{mySupplierById.suppliername}'s Transaction</h1>
        <span>Phone: {mySupplierById.phone}</span>
      </div>
      <div>
        {items.map((form, index) => (
          <div key={index}>
            <form className="items">
              <div className="itemInput">
                <label>Item</label>
                <select
                  className="selectItem"
                  name="item"
                  id="item"
                  value={form.item}
                  onChange={(e) => handleInputChange(e, index)}
                >
                  <option value="18K">18K</option>
                  <option value="21K">21K</option>
                  <option value="24K">24K</option>
                  <option value="Silver">Silver</option>
                  <option value="Watch">Watch</option>
                </select>
              </div>
              <div className="itemInput">
                <label>Weight</label>
                <div className="weightt">
                  <input
                    type="text"
                    name="weight"
                    value={form.weight}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="gram"
                  />
                </div>
              </div>
              <div className="itemInput">
                <label>Description</label>
                <div className="desc">
                  <input
                    type="text"
                    name="desc"
                    placeholder="desc"
                    value={form.desc}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>
              <div className="itemInput">
                <label>Unit Price</label>
                <div className="price">
                  <input
                    type="text"
                    name="unitPrice"
                    placeholder="unitPrice/gram"
                    value={form.unitPrice}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>
            </form>
          </div>
        ))}

        <button className="transButton" onClick={addForm}>
          Add Form
        </button>
      </div>

      <div className="sumSupplierTransContainer">
        <div className="sumLeft">
          <div className="totalRamliInput">
            <span className="ramliInput">
              Total-18K: <b>{total18KWeight} g</b>
            </span>
            <span className="ramliInput">
              Total-21K: <b>{total21KWeight} g</b>
            </span>
            
          </div>
          <div className="totalRamliInput">
            <span className="ramliInput">
              {" "}
              18k to ramli: <b>{w18KtoRamli} g</b>
            </span>
            <span className="ramliInput">
              {" "}
              21k to ramli: <b>{w21KtoRamli} g</b>
            </span>
          </div>
          <div className="totalRamliInput">
            
            <span className="ramliInput">
              24K-Ramli: <b>{total24KWeight} g</b>
            </span>
          </div>
          <div className="totalRamliInput">
            <span className="ramliInput">
              Ramli Total: <b>{ramliTotal} g</b>
            </span>
          </div>
          <div className="totalRamliInput">
            <span className="ramliTitle">
              Ramli Old Balance: <b>{mySupplierById.ramliFinalBal} g</b>
            </span>
          </div>
          <div className="totalRamliInput">
            <span className="ramliInput">
              Ramli Final Balance: <b>{ramliFinalBal} g</b>
            </span>
          </div>
        </div>
        <div className="sumRight">
          <div className="totalBalanceInput">
            
            <span className="balanceTitle">
              Total 18K: <b>$ {total18K}</b>
            </span>
            <span className="balanceTitle">
              Total 21K: <b>$ {total21K}</b>
            </span>
            <span className="balanceTitle">
              Total 24K: <b>$ {total24K}</b>
            </span>
          </div>
          <div className="totalBalanceInput">
            <span className="balanceTitle">
              Total: <b>$ {total}</b>
            </span>
          </div>
          <div className="totalBalanceInput">
            <span className="balanceTitle">
              {" "}
              Old Balance: <b>$ {mySupplierById.cashFinalBal} </b>
            </span>
          </div>
          <div className="totalBalanceInput">
            <span className="balanceTitle">
              {" "}
              Final Balance: <b>$ {finalBalance}</b>
            </span>
          </div>
        </div>
      </div>
      <button className="transButton" onClick={handleAddTrans}>
        Add
      </button>
    </div>
  );
};

export default SupplierTrans;
