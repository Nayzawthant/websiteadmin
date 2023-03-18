import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import '../category/category.scss'
import { useState } from 'react'
import { axiosAuth } from '../../config/axios'
import img from '../../../public/1488.gif'
import { API_URL } from '../../config/constant'

const CreateCategory = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [cate, setCate] = useState({
      name: '',    
    });

    const inputChange = (e) => {
      setCate({...cate, [e.target.name]: e.target.value})
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      try {
        const result = await axiosAuth().post(API_URL + 'v1/categories', cate, {});
        console.log(result);
        navigate('/categories');
      } catch (error) {
        console.log(error)
      } 
    };

  return (
    <>
    {
      loading? <div className="loading"><img src={img} alt="" className="loading-img" /></div> :

      <div className="main-category">
              <div className="profile-inner" >
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className='profile-inner-second'>
                    <div className="profile-second">
                    
                    <div className="input-data">
                        <input type="text" name='name' value={cate.name} onChange={inputChange}   required/>
                        <div className="underline"></div>
                        <label>Category Name</label>
                    </div>
                    
                  </div>
                  <div>   
                      <button type='button'  className='send-but' onClick={() => navigate('/categories')}>Back </button>
                      <button type='submit' className='update' onClick={onSubmit} >Update</button>
                  </div>
                  </div>
                </form>   
              </div>
            </div>
    }
    </>
  )
}

export default CreateCategory