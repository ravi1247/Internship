import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import context from '../../Contexts/Context'
import "./Register.css"
import {toast} from 'react-toastify'

function Register(props) {

  sessionStorage.setItem('type',props.type);

const cntxt=useContext(context);
const {setLoggedIn,setLoggedInEmp}=cntxt;
  const navigate=useNavigate()
  const [data, setData] = useState({type:`${props.type}`,name:"",email:"",number:"",password:"",
    browser:sessionStorage.getItem('browser'),
    os:sessionStorage.getItem('os'),
    ip:sessionStorage.getItem('ip'),
    device:sessionStorage.getItem('device')})
  const url=props.type=="Candidate"?'/login':'/loginemployee';
  const token=props.type=='Candidate'?'tokenCand':'tokenEmp';
  console.log(url);
  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

   const clickhandler=async()=>{
  console.log(data)
    if (data.number.length != 10) {
      console.log("first");
      toast.error("Invalid phone Number");
      return;
    }
    if (data.password.length < 5) {
      toast.error("Password too short");
      return;
    }
    toast.success("Wait Your Request is processing")

          const response =await fetch("/api/auth/register",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              "type":props.type
            },
            body:JSON.stringify(data)
          })
          const json=await response.json();
          console.log(json)
          if(json.success)
            {
              sessionStorage.setItem('email',data.email)
              localStorage.setItem(token, json.authtoken);
              if(props.type=="Candidate")
              {
                localStorage.setItem(token, json.authtoken);
                if(sessionStorage.getItem('browser')=='Chrome' && data.email!="")
                 {
                    navigate('/verifyemail');
                 }
                 else
                 {
                   toast.success("Logged in successfully");
                   localStorage.removeItem('tokenEmp');
                   setLoggedIn(true);
                   setLoggedInEmp(false);
                   navigate('/');
                 }
              }
              else
              {
                 
                  localStorage.setItem(token, json.authtoken);
                   if(sessionStorage.getItem('browser')=='Chrome' && data.email!="")
                    {
                       navigate('/verifyemail');
                    }
                    else
                    {
                      setLoggedIn(false);
                      localStorage.removeItem('tokenCand');
                      setLoggedInEmp(true);
                      navigate('/hire');
                    }
              }
            }
            else
            {
              toast.error(json.error)
            }
   }

  return (
    <div className="registerPage ">
      <h1>Register as {props.type}</h1>
      <label htmlFor="email">Email</label>
      <input onChange={onchange} placeholder='name@gmail.com' type="email" id='email' name="email" autoComplete='email' />
      <label htmlFor="password">Password</label>
      <input onChange={onchange} placeholder='$%123Abc$' type="password" name="password" id='password' />
      <label htmlFor="name">First Name</label>
      <input onChange={onchange} placeholder='Avnesh Kumar' type="name" name="name" id='name' autoComplete='name' />
      <label  htmlFor="phone">Phone</label>
      <input onChange={onchange} placeholder='+91' type="number" name="number" id='phone' autoComplete='number' />
      <span>By signing up you agree to our  <Link className='registerHere' to='/terms'>Terms and Conditions</Link></span>
      <button onClick={(e)=>{
            e.preventDefault();
            clickhandler();
           
      }} className='registerbtn' type="button">Submit</button>
      <p>Already registered? Login <Link className='registerHere' to={url}>here</Link></p>
    </div>
  )
}

export default Register