import axios from 'axios'

 export const newRequst = axios.create({
    baseURL:'http://localhost:3001/api/',
    withCredentials:true
})
