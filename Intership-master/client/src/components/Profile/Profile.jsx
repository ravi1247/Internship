import React, { useContext, useEffect, useState } from 'react'
import context from '../Contexts/Context'
import './Profile.css'
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
const cntxt=useContext(context);
const {user,userPosts,applications}=cntxt;
// console.log(userPosts.length)
// console.log(apptdcations.length)
const navigate=useNavigate();
const [loginInfo,setInfo]=useState([]);
// console.log(user)
useEffect(() => {
    let token="tokenEmp";
    let type="Employee"
    if(localStorage.getItem('tokenCand'))
    {
      type="Candidate"
       token="tokenCand";
    }
  const func=async()=>{
    // console.log(localStorage.getItem(token))
    const response=await fetch('/api/auth/logininfo',{
        method:"GET",
        headers:{
            "Content-type":"application/json",
            "authtoken":JSON.stringify(localStorage.getItem(token)),
            "type":type
        }
    })
    const json =await response.json();
    if(json.success)
    {
        // console.log(json)
        json.info.reverse()
        setInfo(json.info);
    }
  }
  func()
}, [])


  return (
    <>
    {user!=undefined && <div className="profile">
       <h1>Hello {user.name}</h1>
       <div className="profilephoto">
        <img src={user.picture} alt="" />
        <button onClick={()=>{
            navigate('/updateprofile')
        }} type='button' style={{width:"150px",position:"relative"}} className='admin'>Update Profile</button>
        </div>
        <div className="profiledetails">
            <ul>
                <li>Name</li>
                <li>Number</li>
                <li>Email</li>
                <li>Logged In As</li>
                <li>Subscription</li>
            </ul>
            <ul>
                <li>{user.name}</li>
                <li>{user.number}</li>
                <li>{user.email}</li>
                <li>{user.type}</li>
                <li>{user.Subscription}</li>
            </ul>
       </div>
      {user?.type=='Candidate' && <div className="applications">
        <h1>Your Applications</h1>
        <ul className="ulhead">
                    <li>Role</li>
                    <li>Company</li>
                    <li>JobType</li>
                    <li>Status</li>
                </ul>
             {applications?.length && applications.map((ele,key)=>{
                 return <ul>
                    <li style={{cursor:"pointer",color:"#261ACB"}} onClick={()=>{
                      navigate(`/${ele.postId?._id}`)
                    }}>{ele.postId?.role}</li>
                    <li>{ele.postId?.company}</li>
                    <li>{ele.postId?.JobOrIntern}</li>
                    <li className=' status register'>{ele.status?"Approved":"Pending"}</li>
                </ul>
             })}
       </div>}
      {user?.type=='Employee' && <div className="posts">
        <h1>Your Job Posts</h1>
        <ul className="ulhead">
                    <li>Role</li>
                    <li>Company</li>
                    <li>JobType</li>
                </ul>
        {userPosts?.length && userPosts.map((ele,key)=>{
            return <ul>
                    <li style={{cursor:"pointer",color:"#261ACB"}} onClick={()=>{
                      navigate(`/${ele._id}`)
                    }}>{ele.role}</li>
                    <li>{ele.company}</li>
                    <li>{ele.JobOrIntern}</li>
                </ul>
             })}
       </div>}
      { <div className="posts">
        <h1>Recent Login</h1>
        <ul className="ulhead">
                    <li>Operating System</li>
                    <li>IP Address</li>
                    <li>Device</li>
                    <li>Browser</li>
                    <li>Time</li>
                </ul>
        {loginInfo!=[] && loginInfo.slice(0,Math.min(5,loginInfo.length)).map((ele,key)=>{
          return <ul>
                    <li>{ele.os}</li>
                    <li>{ele.ip}</li>
                    <li>{ele.device}</li>
                    <li>{ele.browser}</li>
                    <li>{ele.timestamp.slice(0,10)+" "+ele.timestamp.slice(12,20)}</li>
                </ul>
             })}
       </div>}
    </div>}
    </>
  )
}

export default Profile