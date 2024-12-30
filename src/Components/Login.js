import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const  [credentials, setCredentials] = useState({email :"", password:""})
    let history = useHistory();  

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          
        },
        body: JSON.stringify({email: credentials.email,password: credentials.password}),
      });
      const json = await response.json()
      console.log(json);
      if(json.success){
        //Save the auth token and redirect
        localStorage.setItem('token', json.awthtoken);
        console.log(localStorage.getItem('token'));
        history.push("/")
        props.showAlert(" Logged in successfully","success");
        ;
        
      }
      else{
        props.showAlert("Invalid credentials","danger")
      }
  }
  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
    
  return (
    <div 
  className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor: 'transparent'}}>
  <div 
    className="card shadow-lg" 
    style={{
      width: '25rem', 
      padding: '20px', 
      backgroundColor: 'rgba(255, 255, 255, 0.7)',                           // opaque card background
      border: '1px solid rgba(255, 255, 255, 0.2)',                          // border for the card
      backdropFilter: 'blur(10px)'                                             // Blur effect for the card
    }}
  >
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-dark">Email</label>
          <input 
            type="email" 
            className="form-control" 
            value={credentials.email} 
            id="email" 
            onChange={onChange} 
            name="email" 
            aria-describedby="emailHelp" 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-dark">Password</label>
          <input 
            type="password" 
            className="form-control" 
            value={credentials.password} 
            name="password" 
            onChange={onChange} 
            id="password" 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</div>

  )
}

export default Login
