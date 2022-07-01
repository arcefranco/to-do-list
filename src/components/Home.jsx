import React from 'react'
import { getUser } from '../reducers/userSlice'
import { useSelector, useDispatch } from 'react-redux'

function Home() {

const dispatch = useDispatch()
const {user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user)

React.useEffect(()=>{
dispatch(getUser())
}, [])

  return (
    <div>
        <h3>Your userId is {user}</h3>


    </div>
  )
}

export default Home