import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const Signup = (props) => {

  const  [credentials, setCredentials] = useState({name:"",email :"", password:"",confirmPassword:""})
  let history = useHistory();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {name ,email,password}= credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        
        method: "POST",
        headers: {
          "content-type": "application/json",
          
        },
        body: JSON.stringify({name,email,password}),
      });
      const json = await response.json()
      console.log(json);
      if(json.success){
        //Save the auth token and redirect
        localStorage.setItem('token',json.awthtoken);
        history.push("/");
        props.showAlert("Account created successfully","success")
      }
      else{
        props.showAlert("Invalid details","danger")
      }
}

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  return (
    <div className='d-flex justify-content-center align-items-center vh-100' style={{backgroundColor: 'transparent'}}>

      <div class="card" style={{
      width: '25rem', 
      padding: '20px', 
      backgroundColor: 'rgba(255, 255, 255, 0.7)',                           // opaque card background
      border: '1px solid rgba(255, 255, 255, 0.2)',                          // border for the card
      backdropFilter: 'blur(10px)'                                             // Blur effect for the card
    }}>
        <div class="card-body">

        <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" onChange={onChange} name='name' required />    
        </div>
                      
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" required/>    
        </div>
                  
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' onChange={onChange} minLength={5} id="password" required/>
        </div>
                    
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='confirmPassword' onChange={onChange} minLength={5} id="confirmPassword" required/>
        </div>
                    
        <button type="submit" className="btn btn-primary">Submit</button>
      
      </form>
          
        </div>
      </div>
      

    </div>
  )
}

export default Signup
