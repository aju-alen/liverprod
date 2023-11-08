import axios from 'axios'

 export const newRequst = axios.create({
    baseURL:'/api/',
    withCredentials:true
})
