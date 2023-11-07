import axios from 'axios'

 export const newRequst = axios.create({
    baseURL:'http://localhost:8800/api/',
    withCredentials:true
})
