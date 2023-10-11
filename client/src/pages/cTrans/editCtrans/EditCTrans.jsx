import "./editCTrans.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCTrans, getCTrans } from "../../../redux/apiCalls";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EditCTrans = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cTransId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const cTrans = useSelector((state) => state.cTrans.cTrans);

  useEffect(() => {
    getCTrans(dispatch);
  }, [dispatch]);

  const myCTransId = cTrans.find((item) => item._id === cTransId);

  const [items, setItems] = useState(myCTransId.items);
  console.log(" from ctrans items", items);

  //handel cTrans info
  const supplierInfo = [
    myCTransId.customername,
    myCTransId.phone,
    myCTransId.total,
  ];
  const [info, setInfo] = useState(supplierInfo);

  const currentDate = new Date(myCTransId.createdAt);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Function to handle info changes and update the state
  const handleEditInfo = (e) => {
    setInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  console.log(info);

  // Function to handle Items changes and update the state
  const handleEditItems = (e, index) => {
    const { name, value } = e.target;

    // Create a copy of the items array
    const updatedItems = [...items];

    // Update the specific item with the new value
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: value,
    };

    setItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { customername, phone, total } = info;
    const newCTrans = { customername, phone, items, total };
    await dispatch(updateCTrans(newCTrans, cTransId));
    navigate("/customerTransactions");
  };

  return (
    <div className="editCTransContainer">
      <form className="editCTransForm">
        <h2>Edit Transaction </h2>
        <p> Date: {formattedDate}</p>
      

        <div className="inputEdit">
          <label htmlFor="">Customer Name: </label>
          <input
            type="text"
            name="customername"
            placeholder={myCTransId.customername}
            onChange={handleEditInfo}
          />
        </div>

        <div className="inputEdit">
          <label htmlFor="">Phone Number: </label>
          <input
            type="text"
            name="phone"
            placeholder={myCTransId.phone}
            onChange={handleEditInfo}
          />
        </div>

        <table className="editTable">
          <thead>
            <tr>
              <th>Description</th>
              <th>Items</th>
              <th>Weight</th>
              <th>Unit Price</th>
              <th>Item Total</th>
            </tr>
          </thead>
          <tbody>
            {myCTransId.items.map((item, index) => (
              <tr key={item._id}>
                <td>
                  <input
                    type="text"
                    name="desc"
                    placeholder={item.desc}
                    onChange={(e) => handleEditItems(e, index)}
                  />
                </td>
                <td>
                  <select
                    name="item"
                    id="item"
                    placeholder={item.item}
                    onChange={(e) => handleEditItems(e, index)}
                  >
                    <option value="18K">18K</option>
                    <option value="21K">21K</option>
                    <option value="24K">24K</option>
                    <option value="Silver">Silver</option>
                    <option value="Watch">Watch</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    name="weight"
                    placeholder={item.weight}
                    onChange={(e) => handleEditItems(e, index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="unitPrice"
                    placeholder={item.unitPrice}
                    onChange={(e) => handleEditItems(e, index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="itemTotal"
                    placeholder={item.itemTotal}
                    onChange={(e) => handleEditItems(e, index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="totalEditInput">
          <label>Total:</label>
          <input
            type="text"
            name="total"
            placeholder={myCTransId.total}
            onChange={handleEditInfo}
          />
        </div>

        <button className="submitEditData" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditCTrans;
