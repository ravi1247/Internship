import React, { useContext } from 'react'
import "./Sidebar.css"
import { Link } from 'react-router-dom'
import context from '../Contexts/Context'
function Sidebar() {

  const cntxt = useContext(context);
  const {onclikhamburger,loggedIn,setLoggedIn,loggedInEmp}=cntxt;

  return (
    <div id='sidebar1' className="sidebar">
        <ul>
            <li><Link to='jobs' onClick={onclikhamburger}>Job</Link></li>
            <li><Link to='interns' onClick={onclikhamburger}>Internship</Link></li>
            <li><Link onClick={onclikhamburger}>Contact Us</Link></li>
           <li><Link onClick={onclikhamburger} to='/plans'>Subscriptions</Link></li>
           <li><Link onClick={onclikhamburger} to='/hire'>Hire Talent</Link></li>
           {(loggedIn || loggedInEmp )&& <li><Link onClick={onclikhamburger} to='/profile'>Profile</Link></li>}
            <div className="line"></div>
           {!loggedIn && <>
            <li><Link onClick={onclikhamburger} to='/login'>Login</Link></li>
            <li><Link onClick={onclikhamburger} to='/register'>SignUp</Link></li>
            </>}
            {loggedIn && 
            <li><Link onClick={()=>{
              onclikhamburger();
              localStorage.removeItem("tokenCand");
              setLoggedIn(false)
            }} to='/login'>Logout</Link></li>
            }
        </ul>
        <i onClick={onclikhamburger} className="bi bi-x-square-fill"></i>
    </div>
  )
} 

export default Sidebar