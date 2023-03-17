import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ProtectedRoute from '../../protected/ProcteRoute'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import AppsIcon from '@mui/icons-material/Apps';

const Main = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <ProtectedRoute>
            <Navbar />
            <div className="app_mains">
                <div className={isOpen ? "app_left_second" : "app_left"}>
                    <div className="top_section main_top_section">
                        <h1 style={{ display: isOpen ? "block" : "none" }} className="logo"  >Logo</h1>
                        <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                            <AppsIcon onClick={toggle} className="icon" />
                        </div>
                    </div>
                    <Sidebar isOpen={isOpen} />
                </div>
                <div className="app_right_second" >
                    <Outlet />

                </div>
            </div>
        </ProtectedRoute>
    )
}

export default Main