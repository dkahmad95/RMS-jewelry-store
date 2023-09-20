import { useState } from "react";
import "./newSupplier.css";
import { useDispatch } from "react-redux";
import { addSupplier } from "../../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const NewSupplier = () => {
  const [inputs, setInputs] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleInputs = (e) =>{
   
      setInputs((prev)=>{
        return {
          ...prev , [e.target.name]:e.target.value
        }
      })
  }
  console.log(inputs)

  const handleSubmit = (e) => {
    e.preventDefault();
    addSupplier(dispatch,inputs)
    navigate("/suppliers")
  }

  return (
    <div className="newSupplier">
      <form className="newSupplierForm">
        <h1 className="newSupplierTitle">New Supplier</h1>

        <div className="newSupplierItem">
          <label>Full Name</label>
          <input type="text" name="suppliername" placeholder="Suppleir Name" onChange={handleInputs} />
        </div>
        <div className="newSupplierItem">
          <label>Phone</label>
          <input type="text" name="phone" placeholder="Phone Number" onChange={handleInputs} />
        </div>
        <span className="newSupplierNote">Please don't put $ sign!</span>
        <div className="newSupplierItem">
          <label>Final Balance</label>
          <input type="text"  name="cashFinalBal" placeholder="Final Balance" onChange={handleInputs} />
        </div>
        <div className="newSupplierItem">
          <label>Ramli Final Balance</label>
          <input type="text"  name="ramliFinalBal" placeholder="Ramli Final Balance" onChange={handleInputs} />
        </div>

        <button className="newSupplierButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
};

export default NewSupplier;
