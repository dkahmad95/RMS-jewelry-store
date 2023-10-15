import "./supplierPayHistory.css";
import { DataGrid } from "@mui/x-data-grid";

import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { getOneSupplier, getOneSupplierPay, getSupplierPay } from "../../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { suppliersRows } from "../../../dummyData";
import { format } from "date-fns";
import { OpenWith } from "@mui/icons-material";
import { getSupplierPayClean } from "../../../redux/supplierPayRedux";
const SupplierPayHistory = () => {


 
  const dispatch = useDispatch();
  const location = useLocation();
  const supplierId = location.pathname.split("/")[2];

  const navigate = useNavigate()

  useEffect(() => {
    getOneSupplier(dispatch, supplierId);
    getSupplierPay(dispatch, supplierId)
    return ()=> {
      dispatch(getSupplierPayClean());
 }
   
  }, [dispatch, supplierId]);
  
  const supplierPay = useSelector((state)=> state.supplierPay.supplierPay)
  console.log("supplierPay", supplierPay)

  const oneSupplier = useSelector((state) => state.suppliers.oneSupplier);
  console.log("oneSupplier", oneSupplier);

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      width: 200,
      renderCell: (params) => {
        const createdAt = params.row.createdAt;
        const date = new Date(createdAt);
        const formattedDate = format(date, "dd/MM/yyyy");

        return <div>{formattedDate}</div>;
      },
    },
   
  
    {
      field: "totalRamli",
      headerName: "Ramli Payment",

      width: 150,
      renderCell: (params) => {
        return <div>{params.row.totalRamli} g</div>;
      },
    },
    {
      field: "cashPayment",
      headerName: "Cash Payment",

      width: 150,
      renderCell: (params) => {
        return <div>$ {params.row.cashPayment}</div>;
      },
    },

    {
      field: "actions",
      headerName: "Actions",

      width: 200,
      renderCell: (params) => {
        return (
          <>
              <div className="iconList">
              <div className="iconTotalList">
                <Link to={"/supplierPayReceipt/" + params.row._id}>
                  <OpenWith className="openWithIcon"  onClick={async () => {
                  await getOneSupplier(dispatch, params.row.supplierId)
                  await getOneSupplierPay(dispatch,params.row._id )
                  navigate("/supplierPayReceipt/" + params.row._id);
                }}/>
                </Link>
              </div>
             
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className="supplierPayHistory">
      <div className="supplierPayHistoryListTitle">
        <h1>{oneSupplier.suppliername}'s Payment History</h1>
        <h3>Phone: {oneSupplier.phone}</h3>
      </div>
      <div
        className="supplierPayHistoryDataGrid"
        style={{ height: 400, width: "100%" }}
      >
        <DataGrid
          disableRowSelectionOnClick
          rows={supplierPay}
          columns={columns}
          getRowId={(row, index) => `${row._id}-${index}`}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
<Link to={"/supplierPay/" + supplierId}>
        <button className="supplierPayHistoryAddButton">Create</button>
      </Link>
    </div>
  );
};

export default SupplierPayHistory;
