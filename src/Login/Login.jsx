import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import imgLoad from '../../../public/1488.gif'
import * as Yup from "yup";
import './login.scss'
import { login } from "../redux/slices/authSlice";
import { clearMessage } from "../redux/slices/messageSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading } = useSelector((state => state.auth))
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const handleLogin = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/dashboard");

      })
      .catch((error) => {
        console.log(error)
      });
  };


  return (
    <div id="login-form" className="login-page">
      <div className="form-box">
        <div class="form-inner">

          <form id='login' class='input-group-login' onSubmit={handleLogin} >
            <h3>Login</h3>
            <input type='text' class='input-field' placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
            <input type='password' class='input-field' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
            {
              isLoading? <button class='submit-btn'><img src={imgLoad} alt=""  /></button> :
              <button type='submit' class='submit-btn'>Login</button>
            }
            {message && (
              <div className="form-group">
                <div style={{ color: 'red', marginTop: '10px' }}>
                  {message}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>


  );
};

export default Login;