import React, { useState } from "react"
import "./Login.scss"
import { newRequst } from "../../utils/newRequest"
import {useNavigate} from 'react-router-dom'

function Login() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(null)

const navigate = useNavigate()

  const handleSubmit =async (event)=>{
    event.preventDefault()

    try{
     const res =  await newRequst.post('auth/login',{username,password})
     localStorage.setItem('currentUser',JSON.stringify(res.data))
     navigate('/')


    }
    catch(err){
      setError(err.response.data)
    }
  }
  return (
    <>
     {error && (
        <div>{error}</div>
      )}
    <div className="login">
     
      <form onSubmit={handleSubmit} >
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={({target})=>setUsername(target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={({target})=>setPassword(target.value)}
        />
        <button type="submit">Login</button>

      </form>
    </div>
    </>
  );

}

export default Login


