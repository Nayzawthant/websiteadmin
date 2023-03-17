import Home from "./pages/home/Home";
import Login from "./Login/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/dark.scss";
import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Profile from "./crud/component/profile/Profile";
import User from "./components/users/User";
import Posts from "./components/posts/Posts";
import Comment from "./components/comments/Comment";
import Category from "./components/category/Category";
import CreateCategory from "./components/updateCategory/CreateCategory";
import PostCreate from "./components/posts/PostCreate";
import Register from "./components/register/Register";
import PostEdit from "./components/posts/PostEdit";
import UserEdit from "./components/users/EditUser";
import EditCategory from "./components/category/EditCategory";
import ProtectedRoute from "./protected/ProcteRoute";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Main from "./components/main/main";



function App() {
  const { darkMode } = useContext(DarkModeContext);
  const user = useSelector(state => state.auth.isLoggedIn)
  console.log(user);
 

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
    

       
          <Routes>
              <Route path="/" element={<Navigate to='/login' element={<Login />} />} />
              <Route path="login" element={<Login />} />

            <Route path="/" element={<Main />} >
              <Route path="dashboard">
                <Route index element={<Home />} />
              </Route>
              <Route path="users">
                <Route index element={<User />} />
                <Route path="register" element={<Register />} />
                <Route path='edit-users/:id' element={<UserEdit />} />
              </Route>
              <Route path="posts">
                <Route index element={<Posts />} />
                <Route path="create-posts" element={<PostCreate />} />
                <Route path="edit-posts/:id" element={<PostEdit />} />
              </Route>
              <Route path="comment">
                <Route index element={<Comment />} />
              </Route>
              <Route path="categories">
                <Route index element={<Category />} />
                <Route path="create-categories" element={<CreateCategory />} />
                <Route path="edit-categories/:id" element={<EditCategory />} />
              </Route>
              <Route path="logout">

              </Route>
            </Route>


          </Routes>
       


      </BrowserRouter>
    </div>
  );
}

export default App;