import React from 'react'
import '../sidebar/dropdown.css'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";


function DropdownItem(props){
    return(
      <li className = 'dropdownItem'>
        <AccountCircleOutlinedIcon />
        <p> {props.text} </p>
      </li>
    );
  }

export default DropdownItem
