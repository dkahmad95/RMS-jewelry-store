import React from "react";
import "./topbar.css";
import { useDispatch } from "react-redux";
import { logout } from '../../redux/userRedux';
import { useNavigate } from "react-router-dom";
import BasicMenu from "../basicMenu/mobileMenu";
import {BasicModal} from "../modal/Modal";


export default function Topbar() {
  const navigat = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    
    dispatch(logout());
    navigat("/login")
    
  };
  const isMobile = window.innerWidth <= 380; 
  console.log(isMobile);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        {/* {isMobile && 
        <div className="basicMenu"><BasicMenu/></div>
        } */}
        <div className="topLeft">
          <span className="logo">Hajj-Ali Jewelry</span>
        </div>
        <div className="topRight">
          <div>
            <BasicModal open={open} setOpen={setOpen} handleClick={handleClick} Title={"Logout"} Body={"Are you sure?"}/>
            <button className="topBarButton" onClick={()=>setOpen(true)} >Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
