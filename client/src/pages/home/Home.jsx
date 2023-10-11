import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";

import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethodes";
import { useSelector } from "react-redux";

const Home = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  
  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/cTrans/income");
        
        
        const sortedData = res.data.sort((a, b) => a._id - b._id);
        
        const formattedData = sortedData.map((item) => ({
          name: MONTHS[item._id - 1],
          Sales: item.total,
        }));
        
        setIncome(formattedData);
      } catch (error) {
       
        console.error("Error fetching income data:", error);
      }
    };
  
    getIncome();
    const getExpenses = async () => {
      try {
        const res = await userRequest.get("/expenses/monthly");
        
        
        const sortedData = res.data.sort((a, b) => a._id - b._id);
        
        const formattedData = sortedData.map((item) => ({
          name: MONTHS[item._id - 1],
          Expenses: item.total,
        }));
        
        setExpenses(formattedData);
      } catch (error) {
       
        console.error("Error fetching expenses data:", error);
      }
    };
  
    getExpenses();
  }, [MONTHS]);

  // Merge the arrays based on the "name" field
const mergedData = expenses.map((expenseItem) => {
  const matchingSalesItem = income.find((salesItem) => salesItem.name === expenseItem.name);

  if (matchingSalesItem) {
    return {
      name: expenseItem.name,
      Expenses: expenseItem.Expenses,
      Sales: matchingSalesItem.Sales,
    };
  }

  return {
    name: expenseItem.name,
    Expenses: expenseItem.Expenses,
    Sales: 0, 
  };
});

const dataKeys = ['Sales','Expenses'];
// const dataKeys = [['Sales','green'], ['Expenses','red']];
console.log("mergedData",mergedData);

  
 console.log("Monthly Expenses", expenses)
 console.log("Monthly Sales", income)
 const isAdmin= useSelector((state)=>state.user.currentUser.isAdmin)

  return (
    <div className="home">
      
      <FeaturedInfo />
      {isAdmin &&
      <Chart data={mergedData} title="Sales Analytics" gird dataKeys={dataKeys} />
      }
      
    </div>
  );
};

export default Home;
