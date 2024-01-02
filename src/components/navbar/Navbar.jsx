import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config/constant";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  let profile = localStorage.getItem('user') ?  JSON.parse(localStorage.getItem('user')) : {};
  let name = profile?.user?.name
  let profileImage = profile?.user?.image

  console.log('profile', profile);

  return (
    <div className="navbarmain">     
        <div className="inner">
        <div className="top">
          <Link style={{ textDecoration: "none" }}>
            <span className="logo">SPORTS</span>
          </Link>
        </div>
          <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="second-icon"
              onClick={() => dispatch({ type: "TOGGLE" } )}
            />
          </div>
          <div className="item">
            <div className="item">
              {name}
            </div>
          </div>
          <div className="item">
          
            <img
              src={profileImage}
              alt=""
              className="avatar"
            />

          </div>
          
          </div>
        </div>
    </div>
  );
};

export default Navbar;