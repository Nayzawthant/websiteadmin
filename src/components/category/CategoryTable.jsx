import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosAuth } from '../../config/axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { textTransform } from '@mui/system';
import { API_URL } from '../../config/constant';


const CategoryTable = () => {
  const navigate = useNavigate();
  const [cate, setCate] = useState([]);
  const [page, setPage] = useState(1);
  const [querry, setQuerry] = useState('')

  const loadCategory = async () => {
    let param = `v1/categories?sortBy=_id:desc&page=${page}&limit=8`

    if (querry) {
      param += `&name=${querry}`
    }
    const resultCate = await (await axiosAuth().get(API_URL + param)).data;
    setPage(resultCate?.page);
    setCate(resultCate);
  };

  const deleteCate = async (id) => {
    alert('You sure this user is category')
    await axiosAuth().delete(API_URL + `v1/categories/${id}`)
    loadCategory();
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
    loadCategory();
  }, [page, querry]);


  return (
    <div className="main_post">
      <div className="create-but">
        <h4>Category</h4>
      </div>
      <div className="create-but">
        <input type="text" placeholder='Search...' value={querry} onChange={searchInput} />
        <button onClick={() => navigate('create-categories')}>Add Category</button>
      </div>
      <div className='thead'>

        <table id="customers">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number of Post</th>
              <th>Action</th>

            </tr>
          </thead>

          <tbody>
            {
              cate?.results?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td >{item.name}</td>
                    <td>{item.numberOfPosts}</td>
                    <td className='cate-action'>
                      <EditIcon className='edit' onClick={() => navigate(`edit-categories/${item.id}`)} />
                      <DeleteIcon className="delete" onClick={() => deleteCate(item.id)} />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>

        </table>

        {
          cate?.results?.length === 0 ? <div> Category Not Found </div> : null
        }

      </div>
      <button className={1 >= page ? 'square_btnnot' : 'square_btn'} disabled={1 >= page} onClick={() => handlePrev()}>Prev</button>
      <span className='page__span'>{cate.page}/{cate.totalPages}</span>
      <button className={cate?.totalPages <= page ? 'square_btnnot' : 'square_btn'} disabled={cate?.totalPages <= page} onClick={() => handleNext()}>Next</button>

    </div>
  )
}

export default CategoryTable
