
import React  from 'react'
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';


export const Navbar = () => {
  let history  = useHistory();
  const handleLogout = ()=>{
    localStorage.removeItem ('token');
    history.push('/login'); 
  }
  
  let location = useLocation();
  
  return (
   
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">iNotebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/"? "active":""}`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/about"? "active":""}`} to="/about">About</Link>
          </li>        
        </ul>
        
        {localStorage.getItem('token') ? (
            <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
          ) : (
            <form className="d-flex">
              <Link className="btn btn-primary mx-2" tabIndex="-1" to="/login" role="button" aria-disabled="true">Login</Link>
              <Link className="btn btn-primary mx-2" tabIndex="-1" to="/signup" role="button" aria-disabled="true">Signup</Link>
            </form>)}
      </div>
    </div>
  </nav>
    
  )
}
export default Navbar;