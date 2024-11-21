import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import context from '../../Contexts/Context';
// import test from './emailfunction';

// import emailjs from 'emailjs-com';

function Email() {
  const navigate=useNavigate();

  const cntxt=useContext(context);
  const {setLoggedIn,setLoggedInEmp}=cntxt;

  const [data,setData]=useState({email:sessionStorage.getItem('email'),otp:""});
  const [sent,setsent]=useState(false);
  const sendOtp=async()=>{
    const res=await fetch('api/auth/send-otp',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const json=await res.json();
    if(json.success)
    {
       setsent(true);
       toast.success(json.message);
    }
    else
    {
      toast.error(json.message);
    }
}
  const verifyOtp=async()=>{
    const res=await fetch('api/auth/verify-otp',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const json=await res.json();
    if(json.success)
    {
       toast.success(json.message);
       if(sessionStorage.getItem('type')=="Candidate")
       {
            setLoggedIn(true);
            setLoggedInEmp(false);
            navigate('/');   
       }
       else{
        setLoggedIn(false);
        setLoggedInEmp(true);
        navigate('/hire');  
       }
    }
    else
    {
         toast.error(json.message);
    }
}

  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  
  
  return (
    <div className="registerPage ">
      <h1>2-Step Authentication required</h1>
   
    <label htmlFor="email">Email</label>
    <input  placeholder='name@gmail.com' type="email" id='email' value={data.email} name="email" autoComplete='email' />
    <button onClick={(e)=>{
            // e.preventDefault();
            sendOtp();
           
      }} className='registerbtn' type="button">{sent?"OTP Sent":"Send OTP"}</button>
    { sent &&
      <>
      <label htmlFor="otp">OTP</label>
    <input onChange={onchange}  type="number" id='otp' name="otp" autoComplete='otp' />
    <button onClick={(e)=>{
      // e.preventDefault();
      verifyOtp();
      
    }} className='registerbtn' type="button">Verify</button>
    </>
      }
  </div>
  )
}

export default Email