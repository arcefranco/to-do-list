import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import { createSlice } from '@reduxjs/toolkit/dist'
import userService from './userService'
import todoService from '../todo/todoService'

// Get user from localStorage
 const user = localStorage.getItem('user')
 
const initialState = {
  user:  user ? user :  null,
  todos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const getUser = createAsyncThunk('userId', async (thunkAPI) => {
    try {
      
      const session = await userService.getUser()

      return session
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

export const getTodos = createAsyncThunk('todo/getTodos', async (id,thunkAPI) => {
    try {
      
      const session = await todoService.getTodos(id)

      return session
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })

export const postTodo = createAsyncThunk('todo/postTodo', async (body, thunkAPI) => {
    try {
      
      const session = await todoService.postTodo(body)

      return session
    } catch (error) {

        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(error.response.data)
    }
  })



  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUser.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
          }) 
          .addCase(getUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
          })
          .addCase(getTodos.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getTodos.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.todos = state.todos.push(action.payload)
          }) 
          .addCase(getTodos.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(postTodo.pending, (state) => {
            state.isLoading = true
          })
          .addCase(postTodo.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.todos = [...state.todos, action.payload]
          }) 
          .addCase(postTodo.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
        }
    })


export const { reset } = userSlice.actions
export default userSlice.reducer