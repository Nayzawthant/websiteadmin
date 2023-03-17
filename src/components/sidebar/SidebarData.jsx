import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CollectionsIcon from '@mui/icons-material/Collections';
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import { logout } from "../../redux/slices/authSlice";


 const SidebarData = [
    {
        name: 'Dashboard',
        icon: <DashboardIcon  />,
        path:'/dashboard',
        setField: false
        
    },
    {
        name: 'Users',
        icon: <PersonOutlineIcon  />,
        path:'/users',
        setField: false
    },
    {
        name: 'Posts',
        icon: <CollectionsIcon  />,
        path:'/posts',
        setField: false
    },
    {
        name: 'Comments',
        icon: <ChatBubbleOutlineOutlinedIcon  />,
        path:'/comment',
        setField: false
        
    },
    {
        name: 'Category',
        icon: <CategoryIcon  />,
        path:'/categories',
        setField: false
        
    },

]

export default SidebarData;