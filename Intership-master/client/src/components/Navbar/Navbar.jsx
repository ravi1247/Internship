import React, { useContext } from 'react'
import logo from "../../Assets/logo.png"
import context from '../Contexts/Context'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Navbar() {

  
  const cntxt=useContext(context);
  const {user,sidebaropen,hamburgerVisible,onclikhamburger,loggedIn,setLoggedIn,loggedInEmp}=cntxt

  const navigate=useNavigate();
 
  const onhover1=()=>{
       
  }
 

  return (
    <div style={{height:"10vh"}}>
   <div className='nav1'>
    <ul>
         {
           hamburgerVisible && <i onClick={onclikhamburger} id='hamburger' style={{position:"absolute",left:"15px",marginTop:"15px"}}  className=" mt-6 text-2xl bi bi-list"></i>
          }
          <Link to='/' className="img">
            <img src={logo} alt="" />
          </Link>

          {!hamburgerVisible && <div className="elem">
            <p><Link  to='/jobs'>Jobs <i className="bi bi-caret-down-fill"></i></Link></p>
            <p><Link to='/interns'>Internships<i className="bi bi-caret-down-fill"></i></Link> </p>
          </div>
            }

          { !hamburgerVisible && <div className="search">
          <i className="bi bi-search"></i>
            <input type="text" name="search" placeholder='Search' />
          </div>}
        <div className="leftEle">

          {!hamburgerVisible &&  
          <>
         <div className="mt-4 auth">
         { !loggedIn && <>
         <button className='login' onClick={()=>{
           navigate('/login')
          }}>Login</button>
            <button onClick={()=>{
              navigate('/register')
            }} className='register'>Register</button>
            </>
            }
           { loggedIn &&
           <>
            <button className='login' onClick={()=>{
              localStorage.removeItem('tokenCand');
              setLoggedIn(false)
              navigate('/login')
            }}>Logout</button>
            <div className="hire">
           <button className='mt-4 mx-7'><Link to='/plans'>Subscriptions</Link></button>
          </div>
            </>
                    }
          </div>
          
          <div className="hire">
           <button className='mt-4 mx-7'><Link to='/hire'>Hire Talent</Link></button>
          </div>
            </>
          } 
         {
          (loggedIn || loggedInEmp) && <div className="hire">
          <button className='mt-4 mx-7'><Link to='/profile'>Profile</Link></button>
         </div>
         }
          
          <div className="mt-4 ">
            <button className='admin'>Admin</button>
          </div>
          {(loggedIn || loggedInEmp)  &&<div className="mt-4 mx-4">
            <img style={{width:"50px",height:"50px",borderRadius:"10px"}} src={user?.picture} alt="" />
          </div>}
        </div>
    </ul>
   {
     sidebaropen &&
     <Sidebar/>
    }
   </div>
    </div>
  );
}
