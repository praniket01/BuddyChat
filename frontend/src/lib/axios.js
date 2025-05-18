import axios from "axios"


const BASE_URL = import.meta.env.MODE ==='development' ? 'http://localhost:5001/api' : '/api'



export const axioInstance = axios.create({
    baseURL:"http://localhost:5001/api",
    withCredentials: true
})