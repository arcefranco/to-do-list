import axios from "axios";
import { ToDo } from "../../types/ToDo";
const URL = "https://api-3sxs63jhua-uc.a.run.app/v1/todo";

import { BodyReq } from "../../types/BodyReq";

export const postTodo = async (body: BodyReq) => {
  const { id, payload } = body;
  try {
    const response = await axios.post(`${URL}/${id}`, payload);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putTodo = async (body: BodyReq) => {
  const { id } = body;
  try {
    const response = await axios.put(`${URL}/${id}`, body);
    response.data.todoId = body.payload && body.payload.todoId;
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteTodo = async (body: BodyReq) => {
  const { id } = body;
  try {
    const response = await axios.delete(`${URL}/${id}`, { data: body });
    response.data.todoId = body.payload && body.payload.todoId;
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTodos = async (id: string) => {
  try {
    const response = await axios.get<ToDo[]>(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const todoService = {
  postTodo,
  getTodos,
  deleteTodo,
  putTodo,
};

export default todoService;
