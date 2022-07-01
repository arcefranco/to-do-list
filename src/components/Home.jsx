import React from 'react'
import { getUser } from '../reducers/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { postTodo } from '../reducers/user/userSlice'

function Home() {

const dispatch = useDispatch()
const {user, todos} = useSelector(
    (state) => state.user)

React.useEffect(()=>{
dispatch(getUser())
}, [])
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
 
}

  return (
    <div>
      <form>
        <input type="text" value={input.title} onChange={handleChange} name="title" placeholder='title'/>
        <input type="text" value={input.message} onChange={handleChange} name="message" placeholder='message'/>
        <button type='submit' onClick={onSubmit}>Submit</button>
      </form>

      {
        todos.length && todos.map(e => (
          <div>
            <p>title: {e.title}</p>
            <p>message: {e.message}</p>
          </div>
        ))
      }
        


    </div>
  )
}

export default Home