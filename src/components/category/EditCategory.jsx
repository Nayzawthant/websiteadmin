import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import '../category/category.scss'
import { useState, useEffect } from 'react'
import { axiosAuth } from '../../config/axios'
import { API_URL } from '../../config/constant'

const EditCategory = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [cate, setCate] = useState({
      name: '',    
    });

    const inputChange = (e) => {
      setCate({...cate, [e.target.name]: e.target.value})
    };

    const editCategory = async (id) => {
    const edit = await (await axiosAuth().get( API_URL + `v1/categories/${id}`)).data;
    setCate({name: edit.name});
    }

    useEffect(() => {
        editCategory(id);
    }, []);
    
    const {id} = useParams();
    const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const result = await axiosAuth().patch( API_URL + `v1/categories/${id}`, cate, {});
    console.log(result);
    navigate('/categories');
    };

  return (
    <div className="main-category">
              <div className="profile-inner" >
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className='profile-inner-second'>
                    <div className="profile-second">
                    <div className="input-data">
                        <input type="text" name="name" value={cate.name} onChange={inputChange} />
                        <div className="underline"></div>
                        <label>Title</label>
                    </div>
                  </div>
                  <div className="button">   
                      <button type='button'  className='send-but' onClick={() => navigate('/categories')}>Back </button>
                      <button type='submit' className='update' onClick={onSubmit} >Update</button>
                  </div>
                  </div>
                </form>   
              </div>
            </div>
  )
}

export default EditCategory