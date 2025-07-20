import React, {useEffect,useState} from 'react'
import Create from './Create'
import axios from 'axios'

import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home ()  {
    const [todos,setTodos]=useState([])
    useEffect(() => {
      axios.get('/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
    },[])

    const handleEdit = (id) => {
      axios.put('/update/' + id)
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))

    }

    const handleDelete = (id) => {
      axios.delete('/delete/' + id)
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))
    }



  return (
    <div className='home'>
      <h1>Todo List</h1>
      <Create />
      <div className="tasks-container">
        {
          todos.length === 0 
          ?
          <div className="no-tasks">
            <h2>No tasks yet</h2>
            <p>Add a task above to get started!</p>
          </div>
          :
          todos.map(todo => (
            <div key={todo._id} className={`task ${todo.done ? 'completed-task' : 'pending-task'}`}>
              <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                {todo.done ? 
                   <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                : <BsCircleFill className='icon'/>
                }
                <p className={todo.done ? "line_through" : ""}> {todo.task}</p>
              </div>
              <div className="task-actions">
                <BsFillTrashFill className='icon' 
                onClick={() => handleDelete(todo._id)}/>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home
