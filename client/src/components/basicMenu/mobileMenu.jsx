import * as React from "react";
import "./basicMenu.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleCloseHome = () => {
    setAnchorEl(null);
    navigate("/");
  };
  const handleCloseTrans = () => {
    setAnchorEl(null);
    navigate("/customerTransactions");
  };
  const handleCloseSupp = () => {
    setAnchorEl(null);
    navigate("/suppliers");
  };
  const handleCloseExpenses = () => {
    setAnchorEl(null);
    navigate("/expenses");
  };
  const handleCloseManage = () => {
    setAnchorEl(null);
    navigate("/");
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate("/administration");
  };

  return (
    <div>
      <Button
        style={{
          fontSize: "13px",
          fontWeight: "600",
          padding: "6px 12px",
          color: "rgb(134, 134, 134)",
          width: "100px",

          padding: "7px 10px",

          margin: "30px",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloseHome}>Home</MenuItem>
        <MenuItem onClick={handleCloseTrans}>Transactions</MenuItem>
        <MenuItem onClick={handleCloseSupp}>Suppliers</MenuItem>
        <MenuItem onClick={handleCloseExpenses}>Expenses</MenuItem>
        <MenuItem onClick={handleCloseManage}>Manage Stock</MenuItem>
      </Menu>
    </div>
  );
}
