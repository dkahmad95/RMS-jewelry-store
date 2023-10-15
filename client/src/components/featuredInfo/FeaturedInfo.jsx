import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import "./featuredinfo.css";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getOverall, updateOverall } from "../../redux/apiCalls";

export default function FeaturedInfo() {
  const [goldPrice, setGoldPrice] = useState(null);
  // const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const overall = useSelector((state) => state.overall.overall[0]);
  const overallId = overall._id;
  
  const onClick = () => {
    axios
      .get(
        `https://api.metalpriceapi.com/v1/latest?api_key=adf23c593e89e6fdc08377d6e7cc4932&base=xau&currencies=USD`
      )
      .then((response) => {
        if (response.data.rates && response.data.rates.USD) {
          const goldPriceValue = response.data.rates.USD;
          const twoDecimalDigits = parseFloat(goldPriceValue).toFixed(2);
          setGoldPrice (twoDecimalDigits);
          console.log(twoDecimalDigits);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching gold price:", error);
      });
    };
    useEffect(() => {
      getOverall(dispatch);
      dispatch(updateOverall(newOverallRamli, overallId));
      // return ()=> {
        //   dispatch(getOverallClean());
        // }
      }, [dispatch]);
      
  const w18KtoRamli = useMemo(() => {
    return ((overall.overall18K * 750) / 995).toFixed(2);
  }, [overall.overall18K]);

  const w21KtoRamli = useMemo(() => {
    return ((overall.overall21K * 875) / 995).toFixed(2);
  }, [overall.overall21K]);

  const avgOjur18K = parseFloat(
    overall.overallPrice18K / overall.overall18K
  ).toFixed(2);

  const avgOjur21K = parseFloat(
    overall.overallPrice21K / overall.overall21K
  ).toFixed(2);


  // const overallRamli =parseFloat( w18KtoRamli +w21KtoRamli + parseFloat(overall.overall24K)))
  const overallRamli = useMemo(() => {
    return (
      parseFloat(w18KtoRamli) +
      parseFloat(w21KtoRamli) +
      parseFloat(overall.overall24K)
    ).toFixed(2);
  }, [w18KtoRamli, w21KtoRamli, overall.overall24K]);

  const overallSales = useMemo(() => {
    return (
      parseFloat(overall.overallCash) - parseFloat(overall.overallExpenses)
    );
  }, [overall.overallCash, overall.overallExpenses]);
 
  const newOverallRamli = {
    overallRamli,
    overallSales,
    avgOjur18K,
    avgOjur21K,
  };
  return (
    <div className="dashboard-container">
      <div className="totalSales">
        <div
          className="cardGoldPrice"
        onClick={onClick}
        >
          <h2>Gold Price</h2>
            <div className="metric">{goldPrice}</div>
        </div>
        <div className="card">
          <h2>Total Sales</h2>
          <div className="metric">${overallSales}</div>
        </div>
      </div>
      <div className="ojur">
        <div className="card">
          <h2>Total Price 18K</h2>
          <div className="metric">$ {overall.overallPrice18K}</div>
        </div>
        <div className="card">
          <h2>Total Price 21K</h2>
          <div className="metric">$ {overall.overallPrice21K}</div>
        </div>
        <div className="card">
          <h2>avg Ojur 18K</h2>
          <div className="metric">$ {overall.avgOjur18K}</div>
        </div>
        <div className="card">
          <h2>avg Ojur 21K</h2>
          <div className="metric">$ {overall.avgOjur21K}</div>
        </div>
      </div>
      <div className="weights">
        <div className="card">
          <h2>Total 18K</h2>
          <div className="metric">{overall.overall18K} g</div>
        </div>
        <div className="card">
          <h2>Total 21K</h2>
          <div className="metric">{overall.overall21K} g</div>
        </div>
        <div className="card">
          <h2>Total 24K</h2>
          <div className="metric">{overall.overall24K} g</div>
        </div>
        <div className="card">
          <h2>Total Ramli</h2>
          <div className="metric">{overallRamli} g</div>
        </div>
      </div>
      <div className="silver">
        <div className="card">
          <h2>Total Silver</h2>
          <div className="metric">{overall.overallSilver} g</div>
        </div>
      </div>

      {/* <div className="card">
        <h2>Total Expenses</h2>
        <div className="metric">${overall.overallExpenses}</div>
      </div> */}
    </div>
  );
}
