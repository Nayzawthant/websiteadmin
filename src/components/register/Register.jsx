import React from 'react'
import './register.css'
import { useState } from 'react';
import { axiosAuthUpload } from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { API_URL } from '../../config/constant';
import img from '../../../public/1488.gif'
import imgLoad from '../../../public/1488.gif'
import axios from 'axios';


const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [user, setUser] = useState({
    name: '',
    image: '',
    email: '',
    password: '',
  });
  console.log(user.image.type)
  const inputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  };

  const onUpload = (files) => {
    setImgLoading(true)
    let formData = new FormData()
    formData.append('file', files[0]);
    formData.append('upload_preset', 'uploads')
    axios.post(
      "https://api.cloudinary.com/v1_1/dd16bmesr/image/upload",
      formData
    ).then((response) => {
      let url = response.data.secure_url
      setUser({ ...user, image: url })
      setImgLoading(false)
    })

  }


  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const newUser = {
        name: user?.name,
        email: user?.email,
        password: user?.password,
        image: user?.image,
      }
      const result = await (await axiosAuthUpload().post( API_URL + 'v1/users', newUser)).data;
      console.log(result);
      navigate('/users')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <>
      {
        loading ? <div className="loading"><img src={img} alt="" className="loading-img" /></div> :

          <div className='main-register'>
            <div className="container">
              <form onSubmit={e => onSubmit(e)} >
                <div className="user-details">

                  <div>
                    <button type="button" className="postBtn">
                      {
                        imgLoading ? <div className="set-loading-img" ><img src={imgLoad} alt="" /></div> :
                          <label  >{user.image ? <img src={user.image} className='image-upload-label' alt='' /> : 
                            <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img"  className="image-upload-label"/>}
                            <input type="file" className='hidden' onChange={(e) => onUpload(e.target.files)} hidden />
                          </label>
                      }
                    </button>
                  </div>
                  <div className="input-box">
                    <span className="details">UserName</span>
                    <input type="text" name='name' placeholder="Enter your username" value={user.name} onChange={e => inputChange(e)} />
                  </div>
                  <div className="input-box">
                    <span className="details">Email</span>
                    <input type="text" name='email' placeholder="Enter your email" value={user.email} onChange={e => inputChange(e)} />
                  </div>
                  <div className="input-box">
                    <span className="details">Password</span>
                    <input type="text" name='password' placeholder="Enter your number" value={user.password} onChange={e => inputChange(e)} />
                  </div>
                </div>
                <div className="button">
                  <button type="submit" onClick={onSubmit} >Register</button>
                </div>
              </form>
            </div>
          </div>

      }
    </>
  )
}

export default Register
