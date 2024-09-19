import axios from 'axios'

 export const newRequst = axios.create({
    baseURL:'https://liverprod-api.onrender.com/api/',
    withCredentials:true
})
