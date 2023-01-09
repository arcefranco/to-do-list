import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import { createSlice } from "@reduxjs/toolkit/dist";
import userService from "./userService";
import todoService from "../todo/todoService";
import { InitialState } from "../../types/InitialState";
import { ToDo } from "../../types/ToDo";
// Get user from localStorage
import { BodyReq } from "../../types/BodyReq";
const user = localStorage.getItem("user");

const initialState: InitialState = {
  user: user ? user : undefined,
  todos: [],
  todosBackUp: [],
  title: "To-do-list",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getUser = createAsyncThunk("userId", async (x, thunkAPI) => {
  try {
    const session = await userService.getUser();

    return session;
  } catch (error: any) {
    (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getTodos = createAsyncThunk(
  "todo/getTodos",
  async (id: string, thunkAPI) => {
    try {
      const session = await todoService.getTodos(id);

      return session;
    } catch (error: any) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const postTodo = createAsyncThunk(
  "todo/postTodo",
  async (body: BodyReq, thunkAPI) => {
    try {
      const session = await todoService.postTodo(body);

      return session;
    } catch (error: any) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const putTodo = createAsyncThunk(
  "todo/putTodo",
  async (body: BodyReq, thunkAPI) => {
    try {
      const session = await todoService.putTodo(body);

      return session;
    } catch (error: any) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (body: BodyReq, thunkAPI) => {
    try {
      const session = await todoService.deleteTodo(body);

      return session;
    } catch (error: any) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = "";
      state.todos = [];
      state.todosBackUp = [];
    },
    postTitle: (state, action) => {
      state.title = action.payload;
    },
    completedTask: (state) => {
      state.todos = state.todosBackUp.filter((e) => e.completed);
    },
    uncompletedTask: (state) => {
      state.todos = state.todosBackUp.filter((e) => !e.completed);
    },
    all: (state) => {
      state.todos = state.todosBackUp;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user =
          typeof action.payload === "string" ? action.payload : undefined;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Error";
      })
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = [...state.todos];
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Error";
      })

      .addCase(postTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = [...state.todos, action.payload];
        state.todosBackUp = [...state.todosBackUp, action.payload];
      })
      .addCase(postTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Error";
      })
      .addCase(putTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(putTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = state.todos.map(
          (obj) => [action.payload].find((o) => o.todoId === obj.todoId) || obj
        );
        state.todosBackUp = state.todosBackUp.map(
          (obj) => [action.payload].find((o) => o.todoId === obj.todoId) || obj
        );
      })
      .addCase(putTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Error";
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = state.todos.filter(
          (e) => e.todoId !== action.payload.todoId
        );
        state.todosBackUp = state.todosBackUp.filter(
          (e) => e.todoId !== action.payload.todoId
        );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Error";
      });
  },
});

export const { reset, completedTask, uncompletedTask, all, postTitle } =
  userSlice.actions;
export default userSlice.reducer;
