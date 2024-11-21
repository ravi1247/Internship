import React, { useContext, useEffect, useState } from 'react'
import context from '../Contexts/Context';
import './Manage.css'
import { useNavigate } from 'react-router-dom';

function ManageApplications() {

  const navigate=useNavigate();
    const cntxt=useContext(context);
    const {user}=cntxt;
    const [data,setdata]=useState([]);
  const getApplications=async()=>{
     const response=  await fetch("api/app/getallEmp",{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "authtoken":JSON.stringify(localStorage.getItem('tokenEmp')),
            "type":"Employee"
          },
     })
     const json=await response.json();
     console.log(json)
     const appli=json.application;
     const fappli=appli.filter(app=>app.postId?.user==user._id)
     setdata(fappli);
     console.log(data);
  }
 
  useEffect(() => {
    getApplications();
  }, [])

  const onclickhandler=async(id)=>{
    const response=await fetch("/api/app/update",{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({id})
      })

      const json=await response.json();
  }

  

  return (
    <div className="manageAppli">
        <h1>Applications to your Job Posts</h1>
    <div className='managebox'>
        {
            data.length!=0 
            && 
              <ul className="ulhead">
                <li>Role</li>
                <li>Company</li>
                <li>JobType</li>
                <li>Date</li>
                <li>Status</li>
                </ul>
        }
        {
            data.length!=0 
            && data.map((ele)=>{
                return <ul>
                <li style={{cursor:"pointer",color:"#261ACB"}} onClick={()=>{
                      navigate(`/${ele.postId?._id}`)
                    }}>{ele.postId?.role}</li>
                <li>{ele.postId?.company}</li>
                <li>{ele.postId?.JobOrIntern}</li>
                <li>{ele.date}</li>
                <li>
                <button onClick={()=>{
                  console.log(ele._id)
                  onclickhandler(ele._id)
                }} disabled={ele.status} className='register'>
                <li>{ele.status?"Approved":"Pending"}</li>
                </button>
                  </li>
            </ul>
            })
        }
    </div>
        </div>
  )
}

export default ManageApplications