import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { axiosAuth, axiosAuthUpload } from '../../config/axios';
import { API_URL } from '../../config/constant';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { format } from 'timeago.js';
import imgLoad from '../../../public/1488.gif'

const PostTable = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const [imgLoading, setImgLoading] = useState(false);
  const [querry, setQuerry] = useState('');
  const [search, setSearch] = useState(false)

  const getPosts = async () => {
    setImgLoading(true);
    let param = `v1/posts?sortBy=_id:desc&page=${page}&limit=8`

    if (querry) {
      param += `&title=${querry}`
    }
    const resultPost = await (await axiosAuth().get(API_URL + param)).data
    setPage(resultPost?.page)
    setPost(resultPost);
    setImgLoading(false)
  }

  console.log(post)
  const handleNext = () => {
    setPage(page + 1)
  }

  const handlePrev = () => {
    setPage(page - 1)
  }

  const searchInput = (e) => {
    setPage(1)
    setQuerry(e.target.value)
  }

  useEffect(() => {
    getPosts();
  }, [page, querry]);

  const { id } = useParams();

  const deletePost = async (id) => {
    alert('You sure this user is post')
    await axiosAuth().delete(API_URL + `v1/posts/${id}`)
    getPosts();
  }

  return (
    <div className='main_post'>
      <div className='create-but'><h4>Posts</h4></div>
      <div className="create-but">
        <input type="text" name="search" placeholder="Search title..." value={querry} onChange={searchInput} />

        <div class="overlay hidden"></div>
        <button onClick={() => navigate('create-posts')}>Add Post</button>
      </div>
      <div className='thead'>
        {
          imgLoading ? <div className="set-loading-img" ><img src={imgLoad} alt="" /></div> :
            <table id="customers">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Category Name</th>
                  <th>Date</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                {
                  post?.results?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td className='post-name'>{item.title}</td>
                        <td className='port-img'>
                          <div className="inner-img">
                            <img src={item.image} alt="" />
                          </div>
                        </td>
                        <td>{item.category.name}</td>
                        <td>{format(item.date)}</td>
                        <td className='cate-action'>
                          <EditIcon className='edit' onClick={() => navigate(`edit-posts/${item.id}`)} />
                          <DeleteIcon className="delete" onClick={() => deletePost(item.id)} />
                        </td>
                      </tr>

                    )
                  })
                }
              </tbody>





            </table>
        }


        {
          post?.results?.length === 0 ? <div> Post Not Found </div> : null
        }


      </div>
      <button
        className={1 >= page ? 'square_btnnot' : 'square_btn'}
        disabled={1 >= page} onClick={() => handlePrev()}
      >
        <ArrowBackIosNewIcon />
      </button>
      <span className='page__span'>{post.page} / {post.totalPages} </span>
      <button
        className={post?.totalPages <= page ? 'square_btnnot' : 'square_btn'}
        disabled={post?.totalPages <= page} onClick={() => handleNext()}
      >
        <ArrowForwardIosIcon />
      </button>
    </div>

  )
}
export default PostTable;
