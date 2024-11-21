import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Phone() {

  const [data,setData]=useState({Phone:""});
  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const clickhandler=()=>{

  }

  return (
    <div className="registerPage ">
      <h1>2-Step Authentication required</h1>
    <label htmlFor="Phone">Phone</label>
    <input onChange={onchange} placeholder='+91' type="number" id='Phone' name="Phone" autoComplete='Phone' />
        <button onClick={(e)=>{
          e.preventDefault();
          clickhandler();
         
    }} className='registerbtn' type="button">Submit</button>
  </div>
  )
}

export default Phone