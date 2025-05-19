import axios from "axios"


const BASE_URL = import.meta.env.MODE ==='development' ? 'http://localhost:5001/api' : 'https://buddychat-2ptu.onrender.com/api'



export const axioInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})