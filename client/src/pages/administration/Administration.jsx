import { useEffect, useState } from "react";
import "./administration.css"
import{useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import { getOverall, updateOverall } from "../../redux/apiCalls";
const Administration = () => {
  const [inputs, setInputs] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()


const overall = useSelector((state)=> state.overall.overall[0])
const overallId=overall._id
console.log("overallId",overall)

const handleInputs= (e)=> {
  setInputs((prev)=>{
    return {
      ...prev , [e.target.name]:e.target.value
    }
  })
}
console.log(inputs)
const handleSubmit= (e)=> {
  e.preventDefault();
  dispatch(updateOverall(inputs, overallId))
  navigate("/")
}

  return (
    <div className="administration">
       <form className="administrationForm">
        <h1 className="administrationTitle">Update Stock</h1>

        <div className="administrationItem">
          <label>Total Sales</label>
          <input type="text" name="overallCash" placeholder={overall.overallCash} onChange={handleInputs} />
        </div>
        <div className="administrationItem">
          <label>Total Expenses</label>
          <input type="text" name="overallExpenses" placeholder={overall.overallExpenses} onChange={handleInputs} />
        </div>
       
        <div className="administrationItem">
          <label>Total 18K</label>
          <input type="text"  name="overall18K" placeholder={overall.overall18K} onChange={handleInputs} />
        </div>
        <div className="administrationItem">
          <label>Total 21K</label>
          <input type="text"  name="overall21K" placeholder={overall.overall21K} onChange={handleInputs} />
        </div>
        <div className="administrationItem">
          <label>Total Ramli</label>
          <input type="text"  name="overallRamli" placeholder={overall.overallRamli} onChange={handleInputs} />
        </div>

        <button className="administrationButton" onClick={handleSubmit}>Update</button>
      </form>
    </div>
  )
}

export default Administration