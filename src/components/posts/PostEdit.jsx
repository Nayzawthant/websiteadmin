import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../posts/post.scss'
import img from '../../../public/1488.gif'
import { axiosAuth, axiosAuthUpload } from '../../config/axios'
import { API_URL } from '../../config/constant'
import axios from 'axios'
import imgLoad from '../../../public/1488.gif'


const PostEdit = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState('');
  const [imgLoading, setImgLoading] = useState(false);
  const [post, setPost] = useState({
    title: '',
    image: '',
    category: '',
    desc: ''
  });



  const inputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    editPost(id);
    loadCategory();
  }, []);

  const editPost = async (id) => {
    const edit = await (await axiosAuthUpload().get(API_URL + `v1/posts/${id}`)).data;
    setPost(edit);
    setDesc(edit.desc)
  }

  const loadCategory = async () => {
    const resultCate = await (await axiosAuth().get(API_URL + `v1/categories`)).data;
    setCategory(resultCate);
  }

  const cateChange = (e) => {
    setPost({ ...post, category: e.target.value })
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
      setPost({ ...post, image: url })
      setImgLoading(false)
    })

  }



  const { id } = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newPost = {
        title: post?.title,
        desc: desc,
        category: post?.category,
        image: post?.image,
      }
      const result = await (await axiosAuthUpload().patch(API_URL + `v1/posts/${id}`, newPost)).data;
      console.log(result);
      navigate('/posts')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  return (
    <div>
      {
        loading ? <div className="loading"><img src={img} alt="" className="loading-img" /></div> :
          <div className='post-sha' >
            <form onSubmit={e => onSubmit(e)} >
              <div className='profile-inner-second'>
                <button type="button" className="postBtn">
                  {
                    imgLoading ? <div className="set-loading-img" ><img src={imgLoad} alt="" /></div> :
                      <label  >{post.image ? <img src={post.image} className='image-upload-label' alt='' /> : <span className='span'>Add Your Photo</span>}
                        <input type="file" className='hidden' onChange={(e) => onUpload(e.target.files)} hidden />
                      </label>
                  }
                </button>
                <div >
                  <div className="col-25">
                    <label>Post Title</label>
                  </div>
                  <div className="col-75">
                    <input type="text" name='title' value={post.title} onChange={e => inputChange(e)} placeholder="Title" />
                  </div>
                </div>
                <div >
                  <div className="col-25">
                    <label>Category</label>
                  </div>
                  <div className="col-75">
                    <select value={post.category} onChange={cateChange} >
                      <option value="">Select Category</option>
                      {
                        category?.results?.map((cate, index) => {
                          return (
                            <option key={index} value={cate.id} >{cate.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="profile-second">
                  <div className="quill-textarea">
                    <label>Descraption</label>
                    <ReactQuill theme='snow' value={desc} onChange={(e) => setDesc(e)} />
                  </div>

                </div>
                <div>
                  <button type='button' className='send-but' onClick={() => navigate('/posts')}>Back </button>
                  <button type='submit' className='update' onClick={onSubmit}  >Update</button>
                </div>
              </div>
            </form>
          </div>
      }
    </div>
  )
}

export default PostEdit