import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import "./featuredinfo.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getOverall } from "../../redux/apiCalls";
import { getOverallClean } from "../../redux/overallRedux";



export default function FeaturedInfo() {
  // const [goldPrice, setGoldPrice] = useState(null);
  const dispatch = useDispatch()
  const overall = useSelector((state)=> state.overall.overall)
  console.log(overall)
  
  
  // useEffect(() => {
  //   axios.get(`https://api.metalpriceapi.com/v1/latest?api_key=adf23c593e89e6fdc08377d6e7cc4932&base=xau&currencies=USD`)
  //     .then((response) => {
  //       if (response.data.rates && response.data.rates.USD) {
  //         const goldPriceValue = response.data.rates.USD;
  //         const twoDecimalDigits = parseFloat(goldPriceValue).toFixed(2); 
  //         setGoldPrice(twoDecimalDigits);
  //         console.log(twoDecimalDigits);
  //       } else {
  //         console.error('Unexpected response format:', response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching gold price:', error);
  //     });

  // }, []);

  useEffect(()=>{
    getOverall(dispatch)
    // return ()=> {
    //   dispatch(getOverallClean());
    // }
  },[dispatch])
  
  return (
    <div className="dashboard-container">
      
      <div className="card">
        <h2>Live Gold Stock</h2>
        <div className="metric">$ 1,895</div>
      </div>
      <div className="card">
        <h2>Total Sales</h2>
        <div className="metric">${overall.map((item)=>item.overallCash)}</div>
      </div>
      <div className="card">
        <h2>Total Expenses</h2>
        <div className="metric">${overall.map((item)=>item.overallExpenses)}</div>
      </div>
      <div className="card">
        <h2>Total 18K</h2>
        <div className="metric">{overall.map((item)=>item.overall18K)} g</div>
      </div>
      <div className="card">
        <h2>Total 21K</h2>
        <div className="metric">{overall.map((item)=>item.overall21K)} g</div>
      </div>
      <div className="card">
        <h2>Total Ramli</h2>
        <div className="metric">{overall.map((item)=>(item.overallRamli).toFixed(2))} g</div>
      </div>
    </div>
  );
};
  