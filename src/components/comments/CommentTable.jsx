import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosAuth } from '../../config/axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { textTransform } from '@mui/system';
import { API_URL } from '../../config/constant';


const CommentTable = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState([]);
  const [page, setPage] = useState(1);
  const [querry, setQuerry] = useState('')

  const loadComment = async () => {
    let param = `v1/comments?sortBy=_id:desc&page=${page}&limit=8`

    if (querry) {
      param += `&name=${querry}`
    }
    const resultCom = await (await axiosAuth().get(API_URL + param)).data;
    setPage(resultCom?.page);
    setComment(resultCom);
  };

  const deleteCom = async (id) => {
    alert('You sure this user is comment')
    await axiosAuth().delete(API_URL + `v1/comments/${id}`)
    loadComment();
  };

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
    loadComment();
  }, [page, querry]);


  return (
    <div className="main_post">
      <div className="create-but">
        <h4>Comments</h4>
      </div>

      <div className='thead'>
      <table id="customers">
          <thead>
            <tr>
              <th>Name</th>
              <th>Desc</th>
              <th>Action</th>

            </tr>
          </thead>

          <tbody>
            {
              comment?.results?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td >{item.name}</td>
                    <td>{item.desc}</td>
                    <td className='cate-action'>
                      <DeleteIcon className="delete" onClick={() => deleteCom(item.id)} />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>

        </table>

        {
          comment?.results?.length === 0 ? <div> Category Not Found </div> : null
        }

      </div>
      <button className={1 >= page ? 'square_btnnot' : 'square_btn'} disabled={1 >= page} onClick={() => handlePrev()}>Prev</button>
      <span className='page__span'>{comment.page}/{comment.totalPages}</span>
      <button className={comment?.totalPages <= page ? 'square_btnnot' : 'square_btn'} disabled={comment?.totalPages <= page} onClick={() => handleNext()}>Next</button>

    </div>
  )
}

export default CommentTable
