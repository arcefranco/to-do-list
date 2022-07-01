import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import { createSlice } from '@reduxjs/toolkit/dist'
import userService from './userService'

// Get user from localStorage
 const user = JSON.parse(localStorage.getItem('user'))
 
const initialState = {
  user:  user ? user :  null,
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
        }
    })


export const { reset } = userSlice.actions
export default userSlice.reducer