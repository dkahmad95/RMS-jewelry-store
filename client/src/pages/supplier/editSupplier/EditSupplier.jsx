import { useEffect, useState } from 'react';
import './editSupplier.css'
import { useDispatch, useSelector } from 'react-redux';
import {  useLocation, useNavigate } from 'react-router-dom';
import { getSuppliers, updateSupplier } from '../../../redux/apiCalls';

const Supplier = () => {
const [info , setInfo] = useState({})
const dispatch = useDispatch();
const navigate = useNavigate();
useEffect(()=>{
  getSuppliers(dispatch)
},[dispatch])
const suppliers = useSelector((state)=> state.suppliers.suppliers)
console.log(suppliers)
const location = useLocation();
const supplierId = location.pathname.split("/")[2]
const mySupplierId = suppliers.find((item)=> item._id === supplierId)





  // Function to handle info changes and update the state
  const handleEditInfo = (e) => {
    setInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  console.log(info);

  const handleEdite = (e) => {
    e.preventDefault();
    dispatch(updateSupplier(info , supplierId))
    navigate("/suppliers")

  }


  return (
    <div className="updateSupplier">
      
    <form className="updateSupplierForm">
      <h1 className="updateSupplierTitle">Edit Supplier</h1>
      
      <div className="updateSupplierItem">
        <label>Full Name</label>
        <input type="text" name="suppliername" placeholder={mySupplierId.suppliername} onChange={handleEditInfo} />
      </div>
      <div className="updateSupplierItem">
        <label>Phone</label>
        <input type="text" name="phone" placeholder={mySupplierId.phone} onChange={handleEditInfo} />
      </div>
      <div className="updateSupplierItem">
        <label>Final Balance</label>
        <input type="text" name='cashFinalBal' placeholder={mySupplierId.cashFinalBal} onChange={handleEditInfo} />
      </div>
      <div className="updateSupplierItem">
        <label>Ramli Final Balance</label>
        <input type="text" name='ramliFinalBal' placeholder={mySupplierId.ramliFinalBal} onChange={handleEditInfo} />
      </div>
     
      
      <button className="updateSupplierButton" onClick={handleEdite}>Edit</button>
    </form>
  </div>
  )
}

export default Supplier