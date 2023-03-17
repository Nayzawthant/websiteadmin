import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CollectionsIcon from '@mui/icons-material/Collections';
import CategoryIcon from '@mui/icons-material/Category';
import { useEffect, useState } from "react";
import { axiosAuth, axiosAuthUpload } from "../../config/axios";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { API_URL } from "../../config/constant";

const Home = () => {
  const [userAll, setUserAll] = useState('');
  const [postAll, setPostAll] = useState('');
  const [comment, setComment] = useState('');
  const [categoryAll, setCategoryAll] = useState('');

  const loadCategory = async () => {
    const resultCategory = await (await axiosAuth().get(API_URL + 'v1/categories')).data;
    setCategoryAll(resultCategory);

  };

  const loadComment = async () => {
    const resultComment = await (await axiosAuth().get(API_URL + 'v1/comments')).data;
    setComment(resultComment);

  };

  const loadUser = async () => {
    const resultUser = await (await axiosAuthUpload().get(API_URL + 'v1/users')).data;
    setUserAll(resultUser);
  };

  const loadPost = async () => {
    const resultPost = await (await axiosAuthUpload().get(API_URL + 'v1/posts')).data;
    setPostAll(resultPost);
  };

  useEffect(() => {
    loadUser();
    loadPost();
    loadCategory();
    loadComment();
  })

  return (
    <div>
      <div className="home">
        <div className="homeContainer">
          <div className="main-dashboard">
            <div className="dashboard-users">
              <div className="dashboard">
                <span className="dashboard-span">Users</span>
                <PersonOutlineIcon className="dashboard-icon" />
              </div>
              <div className="dashboard-total">{userAll.totalResults}</div>
            </div>
            <div className="dashboard-users">
              <div className="dashboard">
                <span className="dashboard-span">Posts</span>
                <CollectionsIcon className="dashboard-icon" />
              </div>
              <div className="dashboard-total">{postAll.totalResults}</div>
            </div>
            <div className="dashboard-users">
              <div className="dashboard">
                <span className="dashboard-span">Categories</span>
                <CategoryIcon className="dashboard-icon" />
              </div>
              <div className="dashboard-total">{categoryAll.totalResults}</div>
            </div>
            <div className="dashboard-users">
              <div className="dashboard">
                <span className="dashboard-span">Comments</span>
                <ChatBubbleOutlineOutlinedIcon className="dashboard-icon" />
              </div>
              <div className="dashboard-total">{comment.totalResults}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;