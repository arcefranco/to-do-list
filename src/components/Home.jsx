import React from 'react'
import { getUser } from '../reducers/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { postTodo, putTodo, deleteTodo } from '../reducers/user/userSlice'

function Home() {

const dispatch = useDispatch()


React.useEffect(()=>{
dispatch(getUser())
}, [])


const {user, todos} = useSelector(
    (state) => state.user)

  
const [input, setInput] = useState({
  title: '',
  message: ''
  }) 
const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...input, [name]: value };
    setInput(newForm);
};
const onSubmit = async (e) => {
  e.preventDefault()
  const body = {
    id: user,
    payload: input
  }
  dispatch(postTodo(body))
 setInput({
  title: '',
  message: ''
  })
}
 const onChecked = (event, todoId, completed) => {
event.preventDefault()

const body = {
  id: user,
  todoId: todoId,
  completed: !completed
}

dispatch(putTodo(body))
}

const onDelete = (event, todoId) => {
  event.preventDefault()
  const body = {
    id: user,
    todoId: todoId
  }
  dispatch(deleteTodo(body))
}
 

  return (
    <div>
    <form> 
        <input type="text" value={input.title} onChange={handleChange} name="title" placeholder='title'/>
        <input type="text" value={input.message} onChange={handleChange} name="message" placeholder='message'/>
        <button type='submit' onClick={onSubmit}>Submit</button>
     </form> 

      {
        todos.length>=1 && todos.map(e => (
          <div key={e.todoId}>
            <p>title: {e.title}</p>
            <p>message: {e.message}</p>
            <input type="checkbox" onChange={(event) => onChecked(event, e.todoId, e.completed)} onClick={(event) => onChecked(event, e.todoId, e.completed)} checked={e.completed} />
            
           <button onClick={(event) => onDelete(event, e.todoId)}>Delete</button>  
          </div>
        ))
      }
        


    </div>
  )
}

export default Home