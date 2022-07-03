import React from 'react'
import { getUser } from '../reducers/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { postTodo, putTodo, deleteTodo, completedTask, uncompletedTask, all, reset, postTitle } from '../reducers/user/userSlice'
import Modal from './Modal'
import plus from '../assets/plus.png'
import styles from './Home.module.css'


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
  const [modalClose, setModalClose] = useState(false)

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
  dispatch(completedTask())
}else if(e.target.value === "uncompleted"){
  dispatch(uncompletedTask())
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

const handelModalSubmit = (e) => {
  e.preventDefault()
  dispatch(reset())
  setModalClose(false)
}

  return (
    <div className={styles.container}>
      
    
    <form className={styles.form}> 
        {
          todos.length===0 && 
          <div className={styles.firstDiv}>
        <input type="text" value={input.title} onChange={handleChange} name="title" placeholder='title'/>
        <p style={{fontFamily:'Helvetica'}}>¿Qué cosas tenés que terminar hoy?</p>
         
           <input type="text" value={input.message} onChange={handleChange} name="message" placeholder='Escribí un item'/><br />
        <button type='submit' className={styles.firstButton} disabled={!input.message} onClick={onSubmitTitle}>Agregar</button>
        </div>
        } 
          {
          todos.length>=1 &&  
          <div className={styles.containerForm}>
          <input type="text" value={input.message} onChange={handleChange} name="message" placeholder='Escribí un item'/><br />

            <div className={styles.itemBox}>
                <div style={{display:'flex', placeContent:'space-between'}}>
                  <div className={styles.todoTitle}>
                    <h2>{title}</h2>
              
              <button style={{background:'none', border:'none', cursor:'pointer'}} type="button" onClick={() => setModalClose(true)}>
                <img src={plus} style={{width:'2rem', height:'2rem'}} alt="" />  <img/>
                </button>
                 
                  </div>
                <div style={{marginTop:'20px'}}>
                         <select style={{border:'none'}} onChange={(e) => onSelect(e)} onClick={() => handleSelect()}>
        <option value="all">ALL</option>
        <option value="completed" disabled={completed}>COMPLETED</option>
        <option value="uncompleted"disabled={uncompleted}>UNCOMPLETED</option>
      </select>
                </div>
 
        </div>
                {
               todos.map(e => (
          <div key={e.todoId} className={styles.containerTodo}>
            <div style={{display:'flex'}}>
               <input type="checkbox" onChange={(event) => onChecked(event, e.todoId, e.completed)} onClick={(event) => onChecked(event, e.todoId, e.completed)} checked={e.completed} />
            <p style={{fontWeight:'bold'}}>{e.message}</p>
            </div>
           
            
           <button  onClick={(event) => onDelete(event, e.todoId)}>Delete</button>
             
          </div>
        ))
          }

            </div>





          <button type='submit' disabled={!input.message} className={styles.firstButton} onClick={onSubmit}>Agregar</button>
        </div>
        }
        
   
     </form> 


                  {modalClose === true && <Modal>
                 
                      <div className={styles.modalTitle}>
                        <h2>Empezar nueva lista</h2>
                        <p>Cuando empezas una nueva lista, tu lista existente se elimina <br /><br />
                        ¿Estás seguro de que quieres empezar una nueva lista?
                        </p>
                      </div>
                      <div className={styles.modalButtons}> 
                        <button onClick={(e) => handelModalSubmit(e)} className={styles.newList}>Nueva lista</button> 
                      <button onClick={() => setModalClose(false)} className={` ${styles.modalClose}`}>Cancelar</button>

                      </div>
                      
                   
                      </Modal>
                      } 
        


    </div>
  )
}

export default Home