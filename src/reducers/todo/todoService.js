import axios from "axios";
const URL = 'https://api-3sxs63jhua-uc.a.run.app/v1/todo'


export const postTodo = async (body) => {
    const {id, payload} = body
    try {
        const response = await axios.post(`${URL}/${id}`, payload)
    
        return response.data
    } catch (error) {
        console.log(error)
        return error
    } 
}


export const putTodo = async (body) => {
    const {id} = body
    try {
        const response = await axios.put(`${URL}/${id}`,body)
        response.data.todoId = body.todoId
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteTodo = async (body) => {
    const {id} = body
    try {
        const response = await axios.delete(`${URL}/${id}`,{data: body})
        response.data.todoId = body.todoId
        return response.data
    } catch (error) {
        return error
    }
}

export const getTodos = async (id) => {
try {
    const response = await axios.get(`${URL}/${id}`)
    return response
} catch (error) {
    console.log(error)
    return error
}


}


const todoService = {
    postTodo,
    getTodos,
    deleteTodo,
    putTodo,
    }
    
    export default todoService