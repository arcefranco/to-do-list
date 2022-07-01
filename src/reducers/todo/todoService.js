import axios from "axios";
const URL = 'https://api-3sxs63jhua-uc.a.run.app/v1/todo'


export const postTodo = async (body) => {
    const {id, payload} = body
    try {
        console.log('this is body: ', payload)
        const response = await axios.post(`${URL}/${id}`, payload)
        return response.data
    } catch (error) {
        console.log(error)
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
    getTodos
    }
    
    export default todoService