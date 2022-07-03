import React from 'react'
import { getUser } from '../reducers/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { postTodo, putTodo, deleteTodo, completed, uncompleted, all, reset, postTitle } from '../reducers/user/userSlice'


function Home() {

const dispatch = useDispatch()


React.useEffect(()=>{
 dispatch(getUser()) 
}, [])


const {user, todos, title, todosBackup} = useSelector(
  (state) => state.user)
  
  
  const [input, setInput] = useState({
    title: 'To-do-list',
    message: ''
  }) 
  const [uncompleted, setUncompleted] = useState(true)
  const [completed, setCompleted] = useState(true)

const [select, setSelect] = useState("all")

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
const onSubmitTitle = (e) => {
  e.preventDefault()
  const body = {
    id: user,
    payload: input
  }

  dispatch(postTodo(body))
  dispatch(postTitle(input.title))

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
setCompleted(true)
setUncompleted(true)
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

const onSelect = (e) => {
  setSelect(e.target.value)

if(e.target.value === "completed"){
  dispatch(completed())
}else if(e.target.value === "uncompleted"){
  dispatch(uncompleted())
}else{
  dispatch(all())
}
 }
 
const handleSelect = () => {
 const inputs = Array.from(document.querySelectorAll('input[type=checkbox]'))
  if(inputs.find(e=> e.checked)){
    setCompleted(false)
  }
 if(inputs.find(e=> !e.checked)){
    setUncompleted(false)
   
  }

}

  return (
    <div data-testid='Home'>
      {
       title && todos.length >=1 &&
       <div>
        <select name="" id="" onChange={(e) => onSelect(e)} onClick={() => handleSelect()}>
        <option value="all">ALL</option>
        <option value="completed" disabled={completed}>COMPLETED</option>
        <option value="uncompleted"disabled={uncompleted}>UNCOMPLETED</option>
      </select>
      <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
        
      }
      
    
    <form> 
        {
          todos.length===0 && 
          <div>
        <input type="text" value={input.title} onChange={handleChange} name="title" placeholder='title'/>
        <p>¿Qué cosas tenes que hacer hoy?</p>
         
           <input type="text" value={input.message} onChange={handleChange} name="message" placeholder='message'/><br />
        <button type='submit' disabled={!input.message} onClick={onSubmitTitle}>Submit</button>
        </div>
        } 
          {
          todos.length>=1 &&  
          <div>

         
           <input type="text" value={input.message} onChange={handleChange} name="message" placeholder='message'/><br />
        <button type='submit' disabled={!input.message} onClick={onSubmit}>Submit</button>
        </div>
        }
        
   
     </form> 
    {
      todos.length>=1 && <h1>{title}</h1>
    }

      {
        todos.length>=1 && todos.map(e => (
          <div key={e.todoId}>
            <p>message: {e.message}</p>
            <input type="checkbox" onChange={(event) => onChecked(event, e.todoId, e.completed)} onClick={(event) => onChecked(event, e.todoId, e.completed)} checked={e.completed} />
            
           <button  onClick={(event) => onDelete(event, e.todoId)}>Delete</button>
             
          </div>
        ))
      }
        


    </div>
  )
}

export default Home