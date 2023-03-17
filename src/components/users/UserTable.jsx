import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { axiosAuth } from '../../config/axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_URL } from '../../config/constant';

const UserTable = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [querry, setQuerry] = useState('');

  console.log(user);

  const loadUsers = async () => {
    let param = `v1/users?sortBy=_id:desc&page=${page}&limit=8`

    if (querry) {
      param += `&name=${querry}`
    }
    const resultUser = await (await axiosAuth().get(API_URL + param)).data;
    setPage(resultUser?.page)
    setUser(resultUser);
  }

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
    loadUsers();
  }, [page, querry]);

  const deleteUser = async (id) => {
    alert('You sure this user is delete')
    await axiosAuth().delete(API_URL + `v1/users/${id}`)
    loadUsers();
  }

  useEffect(() => {
    loadUsers()
  }, [page, querry]);

  return (
    <div className="main_post">
      <div className="create-but">
        <h4>Users</h4>
      </div>
      <div className="create-but">
        <input type="text" placeholder='Search...' value={querry} onChange={searchInput} />
        <button onClick={() => navigate('register')}>Add User</button>
      </div>
      <div className='thead'>


      <table id="customers">
          <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Email</th>
            <th>Number of Post</th>
            <th>Action</th>

          </tr>
          </thead>
         
          <tbody>
          {
            user?.results?.map((item, i) => {
              return(
                <tr key={i}>
                <td className='post-name'>{item.name}</td>
                <td className='port-img'>
                <div className="inner-img">
                      <img src={item.image} alt="" />
                    </div>
                </td>
                <td>{item.email}</td>
                <td>{item.numberOfPosts}</td>
                <td className='cate-action'>
                    <EditIcon className='edit' onClick={() => navigate(`edit-users/${item.id}`)} />
                    <DeleteIcon className="delete" onClick={() => deleteUser(item.id)} />
                </td>
              </tr>
              )
            })
          }
          </tbody>

        </table>

        {
          user?.results?.length === 0 ? <div> Post Not Found </div> : null
        }


      </div>
      <button className={1 >= page ? 'square_btnnot' : 'square_btn'} disabled={1 >= page} onClick={() => handlePrev()}>Prev</button>
      <span className='page__span'>{user.page}/{user.totalPages}</span>
      <button className={user?.totalPages <= page ? 'square_btnnot' : 'square_btn'} disabled={user?.totalPages <= page} onClick={() => handleNext()}>Next</button>

    </div>
  )
}

export default UserTable
