import "./history.css";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, OpenWith } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { format } from "date-fns";

const History = () => {
  const isAdmin = useSelector((state) => state.user.currentUser.isAdmin);
  const supplierTrans = useSelector(
    (state) => state.supplierTrans.supplierTrans
  );
  const suppliers = useSelector((state) => state.suppliers.oneSupplier);
  const supplierId = suppliers._id;
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
      field: "ramliTotal",
      headerName: "Ramli Total",

      width: 250,
      renderCell: (params) => {
        const sTrans = params.row.sTrans;
        const ramliSec = sTrans.map((item) => item.ramliSec).flat();
        const ramliTotal = ramliSec.map((item) => item.ramliTotal);

        return <div>{ramliTotal} g</div>;
      },
    },
    {
      field: "cashTotal",
      headerName: "Cash Total",

      width: 250,
      renderCell: (params) => {
        const sTrans = params.row.sTrans;
        const cashSec = sTrans.map((item) => item.cashSec).flat();
        const cashTotal = cashSec.map((item) => item.cashTotal);
        return <div>$ {cashTotal}</div>;
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,

      renderCell: (params) => {
        return (
          <>
            <div className="iconList">
              <div className="iconTotalList">
                <Link to={"/supplierTransReceipt/" + params.row._id}>
                  <OpenWith className="openWithIcon" />
                </Link>
              </div>
              {isAdmin && (
                <div className="iconTotalList">
                  <Link to={"/editSupplierTrans/" + params.row._id}>
                    <Edit className="suppleirsTransEditButton" />
                  </Link>
                </div>
              )}
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className="history">
      <div className="historyListTitle">
        <h1>{suppliers?.suppliername}'s Transaction List</h1>
        <span>Phone: {suppliers?.phone}</span>
      </div>
      <div className="historyDataGrid" style={{ height: 400, width: "100%" }}>
        <DataGrid
          disableRowSelectionOnClick
          rows={supplierTrans}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 100]}
          checkboxSelection
        />
      </div>
      <Link to={"/supplierTrans/" + supplierId}>
        <button className="historyAddButton">Add</button>
      </Link>
    </div>
  );
};

export default History;
