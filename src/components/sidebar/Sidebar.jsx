import "./sidebr.scss";
import { useDispatch } from 'react-redux'
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { NavLink } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import AppsIcon from '@mui/icons-material/Apps';
import SidebarData from "./SidebarData";
import { logout } from "../../redux/slices/authSlice";

const Sidebar = ({isOpen}) => {
  const Dispatch = useDispatch()
  const { dispatch } = useContext(DarkModeContext);
  const [icon, setIcon] = useState(false);
  const Logout = () => {
    Dispatch(logout())
    alert('You sure logout')
  }

  return (

        <div  className={isOpen ? "sidebar" : "sidebar-second" }>
          
          {
            SidebarData.map((item, index) => (
              <NavLink to={item.path} key={index} className="link" style={{ textDecoration: "none", alignItems: 'center' }} >
                <div className="icon">{item.icon}</div>
                <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
              </NavLink>
            ))
          }
          <NavLink to={'/login'} style={{ textDecoration: "none", alignItems: 'center' }} className="link"  onClick={Logout}  >
            <div className="icon">
              <ExitToAppIcon />
            </div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Logout</div>
          </NavLink>
        </div>


  );
};

export default Sidebar;