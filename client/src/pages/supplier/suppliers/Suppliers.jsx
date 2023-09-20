import "./suppliers.css";
import { DataGrid } from "@mui/x-data-grid";
import {
  AttachMoney,
  DeleteOutline,
  Edit,
  FormatListBulleted,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import {
  deleteSupplier,
  getOneSupplier,
  getSupplierTrans,
  getSuppliers,
} from "../../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { BasicModal } from "../../../components/modal/Modal";

const Suppliers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const [open, setOpen] = React.useState(false);
  const isAdmin= useSelector((state)=>state.user.currentUser.isAdmin)

  useEffect(() => {
    getSuppliers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteSupplier(dispatch, id);
  };

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
      field: "suppliername",
      headerName: "Supplier Name",
      width: 200,
      renderCell: (params) => {
        return <div>{params.row.suppliername}</div>;
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
      renderCell: (params) => {
        return <div>{params.row.phone}</div>;
      },
    },
    {
      field: "ramliFinalBal",
      headerName: "Ramli Final Balance",

      width: 150,
      renderCell: (params) => {
        return <div>{params.row.ramliFinalBal} g</div>;
      },
    },
    {
      field: "cashFinalBal",
      headerName: "Cash Final Balance",

      width: 150,
      renderCell: (params) => {
        return <div>$ {params.row.cashFinalBal}</div>;
      },
    },

    {
      field: "actions",
      headerName: "Actions",

      width: 200,
      renderCell: (params) => {
        return (
          <>
            <div className="suppliersIcons">
              
                <FormatListBulleted onClick={async () => {
                  await getSupplierTrans(dispatch, params.row._id);
                  await getOneSupplier(dispatch,params.row._id )
                  navigate("/history/"+ params.row._id);
                }} className="suppleirsListHistory" />
              

              <Link to={"/supplierPay/" + params.row._id}>
                <AttachMoney className="suppleirsListPay" />
              </Link>
                {isAdmin &&
                <>
              <Link to={"/editSupplier/" + params.row._id}>
                <Edit className="suppleirsListEdit" />
              </Link>


              <DeleteOutline
                className="suppleirsListDelete"
                onClick={()=>setOpen(true)}              />
              <BasicModal open={open} setOpen={setOpen} handleClick={() => handleDelete(params.row._id)} Title={"Delete"} Body={"Are you sure?"}/>
           </> 
           }
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className="suppliers">
      <div className="supplierListTitle">
      <h1 className="supplierListTitle">Suppliers List</h1>
      </div>
      <div className="suppliersDataGrid" style={{ height: 400, width: "100%" }}>
        <DataGrid
          disableRowSelectionOnClick
          rows={suppliers}
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
      <Link to="/newsupplier">
        <button className="suppliersAddButton">Create</button>
      </Link>
    </div>
  );
};

export default Suppliers;
