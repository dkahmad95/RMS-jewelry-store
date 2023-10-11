import "./newTransaction.css";

import { useEffect, useState,  } from "react";
import { useDispatch } from "react-redux";
import { addCTrans } from "../../../redux/apiCalls";
import {  useNavigate } from "react-router-dom";

const NewTransaction = () => {
  const [items, setItems] = useState([]);
  const [formCounter, setFormCounter] = useState(0);
  const [total, setTotal] = useState(0);
  // eslint-disable-next-line
  const [itemTotal, setItemTotal] = useState([]);
  const [inputs, setInputs] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();


  //handle customername and phone
  const handleInfo = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // create a new CTrans
  const handleAdd = () => {
    const { customername, phone } = inputs;
    const newCTrans = { customername, phone, items, total };
    

    addCTrans(dispatch, newCTrans);
    navigate("/customerTransactions")
  };

  // Function to add a new form to the array
  const addForm = () => {
    const newFormKey = formCounter + 1;
    const newForm = {
      id: formCounter,
      item: "18K",
      weight: "",
      desc: "",
      unitPrice: "",
      itemTotal: 0,
    };

    setItems([...items, newForm]);
    setFormCounter(newFormKey);
  };

  // Function to handle items input changes
  const handleInputChange = (event, formIndex) => {
    const updatedItems = [...items];
    updatedItems[formIndex][event.target.name] = event.target.value;
    // Calculate the total for this form and update its local state
    const quantity =
      parseFloat(updatedItems[formIndex].weight) *
      parseFloat(updatedItems[formIndex].unitPrice);
    updatedItems[formIndex].itemTotal = isNaN(quantity) ? 0 : quantity;

    setItems(updatedItems);
  };

  // Function to handle items submission
  const handleSubmit = (event) => {
    event.preventDefault();
    calculateTotal();
  };

  // function to calculate th item total

  useEffect(() => {
    // Calculate total unitPrices when data changes
    const calculatedTotalPrices = items.map((item) => ({
      id: item.id,
      total: item.weight * item.unitPrice,
    }));
    setItemTotal(calculatedTotalPrices);
  }, [items]);

  // Function to calculate the total
 
  const calculateTotal = () => {
    let sum = 0;
    items.forEach((item) => {
      const quantity = parseFloat(item.weight) * parseFloat(item.unitPrice);
      if (!isNaN(quantity)) {
        sum += quantity;
      }
    });
    setTotal(sum);
  };

  
  console.log(items)
  return (
    <div className="newTransaction">
      <span className="newTransTitle">New Transaction</span>
      <div className="newCustomerInfo">
        <div className="newItemInput">
          <label>Full Name</label>
          <div className="fullName">
            <input
              type="text"
              name="customername"
              placeholder="Customer Name"
              onChange={handleInfo}
            />
          </div>
        </div>
        <div className="newItemInput">
          <label>Phone</label>
          <div className="phone">
            <input
              type="text"
              name="phone"
              placeholder="Customer Phone Number"
              onChange={handleInfo}
            />
          </div>
        </div>
      </div>
      <div>
        {items.map((item, index) => (
          <div key={item.id}>
            <form className="formItems">
              <div className="newItemInput">
                <label>Item</label>
                <select
                  className="selectItem"
                  name="item"
                  id="item"
                  value={item.item}
                  onChange={(e) => handleInputChange(e, index)}
                >
                  <option value="18K">18K</option>
                  <option value="21K">21K</option>
                  <option value="24K">24K</option>
                  <option value="Silver">Silver</option>
                  <option value="Watch">Watch</option>
                </select>
              </div>
              <div className="newItemInput">
                <label>Weight</label>
                <div className="weightt">
                  <input
                    type="text"
                    name="weight"
                    value={item.weight}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="gram"
                  />
                </div>
              </div>
              <div className="newItemInput">
                <label>Description</label>
                <div className="desc">
                  <input
                    type="text"
                    name="desc"
                    placeholder="desc"
                    value={item.desc}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>
              <div className="newItemInput">
                <label>Unit Price</label>
                <div className="price">
                  <input
                    type="text"
                    name="unitPrice"
                    placeholder="price/gram"
                    value={item.unitPrice}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>
              <div className="newItemInput">
                <label>Total</label>
                <div className="itemTotal">
                  <span name="itemTotal">${item.itemTotal}</span>
                </div>
              </div>
            </form>
          </div>
        ))}

        <button className="newTransButton" onClick={addForm}>
          Add
        </button>

        <button className="newTransButton" onClick={handleSubmit}>
          Submit{" "}
        </button>
      </div>

      <div className="sumContainer">
        <div></div>
        <div className="totalBalanceInput">
          <span className="balanceTitle">
            Total: <b>$ {total}</b>
          </span>
        </div>
      </div>
          
      <button className="newTransButton" onClick={handleAdd}>
        Add
      </button>
          
    </div>
  );
};

export default NewTransaction;
