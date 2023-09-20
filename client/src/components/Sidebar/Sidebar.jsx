import { Link } from "react-router-dom";
import "./sidebar.css";
import {
  LineStyle,
  Storefront,
  AttachMoney,
  MonetizationOn,
  Rocket,
  WorkOutline,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const isAdmin= useSelector((state)=>state.user.currentUser.isAdmin)
  console.log(isAdmin)
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {isAdmin && 
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link className="link" to="/">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link className="link" to="/orbit">
              <li className="sidebarListItem ">
                <Rocket className="sidebarIcon" />
                See the Orbit!
              </li>
            </Link>
          </ul>
        </div>
        }
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link className="link" to="/customerTransactions">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Transactions
              </li>
            </Link>
            <Link className="link" to="/suppliers">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Suppliers
              </li>
            </Link>
            <Link className="link" to="/expenses">
              <li className="sidebarListItem">
                <MonetizationOn className="sidebarIcon" />
                Expenses
              </li>
            </Link>
          </ul>
        </div>
        {isAdmin && 
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Manage</h3>
          <ul className="sidebarList">
            <Link className="link" to="/administration">
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                Manage Stock
              </li>
            </Link>
          </ul>
        </div>
}
      </div>
    </div>
  );
}
