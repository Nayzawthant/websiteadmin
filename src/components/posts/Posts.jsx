import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import './post.scss'
import './post.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { useNavigate } from 'react-router-dom';
import PostTable from './PostTable';


const Posts = () => {

  return (
    <PostTable />
  )
}

export default Posts
