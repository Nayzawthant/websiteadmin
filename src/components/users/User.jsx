import React from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from '../../crud/component/profile/Profile'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import './user.scss'
import UserTable from './UserTable'


const User = () => {
  
  return (
    <UserTable />
  )
}

export default User