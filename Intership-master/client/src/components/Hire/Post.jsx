import React, { useContext, useState } from 'react'
import './Post.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import context from '../Contexts/Context';
function Post() {
   
  const cntxt=useContext(context);
  const {data,setdata,setChange,change}=cntxt;
  const navigate=useNavigate();
   const [postData,setpostData]=useState({
    role: "",
    category: "Engineering",
    company: "",
    workType: "Part Time",
    workFrom:"Work from home",
    Duration:"",
    Stipend:"",
    JobOrIntern:"Job",
    skillsRequired:"",
    opennings:"",
    perks:"",
    whocan:"",
    about:"",
    learnings:"",
    applyby:"",
    startdate:"",
    country:"India",
    city:"Pune"
  })

  const onchange = (e) => {
    setpostData({ ...postData, [e.target.name]: e.target.value });
  };
 
  const clickhandler=async()=>{
        if(postData.role.length<3)
        {
             toast.error("Role is Invalid");
             return;
        }
        if(postData.company.length<3)
        {
          toast.error("Invalid Company name");
          return;
        }
        if(postData.applyby.length==0)
          {
          toast.error("Please provide application deadline");
          return;
        }
        if(postData.skillsRequired.length==0)
          {
          toast.error("Please provide Required Skills");
          return;
        }
        if(postData.category.length==0)
          {
          toast.error("Please provide category");
          return;
        }
        const response=await fetch("/api/posts/post",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "authtoken":JSON.stringify(localStorage.getItem('tokenEmp')),
            "type":"Employee"
          },
          body:JSON.stringify(postData)
        })

        const json=await response.json();
        if(json.success)
        {
             let arr=data;
             
            //  setdata(arr);
            //  console.log(console.log(typeof arr))
             setChange(change+1);
             toast.success("Job Posted SuccessFully");
             navigate('/hire');
        }
        else
        {
            toast.error(json.error);
        }
        console.log(json);
  }

  return (
    <div className="jobpost registerPage">
        <h1>Enter Details of the job You want hire</h1>
{/* <form action=""> */}
      <label htmlFor="">Job or Intern</label>
      <select onChange={onchange} className="selectOption" name="JobOrIntern" id="">
        <option value="Job">Job</option>
        <option value="Intern">Intern</option>
      </select>
      <label htmlFor="">Role</label>
      <input onChange={onchange} placeholder='Software Developer etc.' type="text" name="role" id="" />
      <label htmlFor="">Category</label>
      <select onChange={onchange} className="selectOption" name="category" id="">
        <option value="Engineering">Engineering</option>
        <option value="Design">Design</option>
        <option value="Data Science">Data Science</option>
        <option value="Media">Media</option>
        <option value="Business">Business</option>
        <option value="MBA">MBA</option>
      </select>
      <label  htmlFor="">Company</label>
      <input onChange={onchange} placeholder='Ak Private Ltd' type="text" name="company" id="" />
      <label  htmlFor="">Location</label>
      <div className="location flex">
      <select onChange={onchange} className="selectOption selectOption2" name="country" id="">
        <option value="India">India</option>
        <option value="Australia">Australia</option>
        <option value="Britain">Britain</option>
        <option value="USA">USA</option>
        <option value="Russia">Russia</option>
        <option value="China">China</option>
        <option value="other">Other</option>
      </select>
      <select onChange={onchange} className="selectOption selectOption2" name="city" id="">
      <option value="Pune">Pune</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Channai">Channai</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Noida">Noida</option>
        <option value="Gurgaon">Gurgaon</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Chandigarh">Chandigarh</option>
        <option value="NewYork">NewYork</option>
        <option value="London">London</option>
        <option value="Melbourne">Melbourne</option>
      </select>
    
      </div>
      <label htmlFor="">Work Type</label>
      <select onChange={onchange}  name="workType" className="selectOption">
        <option value="Part Time">Part Time</option>
        <option value="Full Time">Full Time</option>
      </select>  
      <label htmlFor="">Work From</label>
      <select onChange={onchange}  name="workFrom" className="selectOption">
        <option value="Work from home">Work From Home</option>
        <option value="In Office">In Office</option>
      </select>
      {/* <input onChange={onchange} type="text" name="workFrom" id="" /> */}
      <label htmlFor="">Start Date</label>
      <input onChange={onchange} type="date" name="startdate" id="" />
      <label htmlFor="">Duration in Months</label>
      <input onChange={onchange} type="number" name="Duration" id="" />
      <label htmlFor="">Stipend</label>
      <input onChange={onchange} type="number" name="Stipend" id="" />
      <label htmlFor="">Apply By</label>
      <input onChange={onchange} type="datetime-local" name="applyby" id="" />
      <label htmlFor="">Skills Required</label>
      <input onChange={onchange} type="text" name="skillsRequired" id="" />
      <label htmlFor="">About the program</label>
      <input onChange={onchange} type="text" name="about" id="" />
      <label htmlFor="">Learnings</label>
      <input onChange={onchange} type="text" name="learnings" id="" />
      <label htmlFor="">Who can apply</label>
      <input onChange={onchange} type="text" name="whocan" id="" />
      <label htmlFor="">Openings</label>
      <input onChange={onchange} type="number" name="opennings" id="" />
      <label htmlFor="">Perks</label>
      <input onChange={onchange} type="text" name="perks" id="" />
{/* </form> */}
      

<button onClick={(e)=>{
            e.preventDefault();
            clickhandler();
           
      }} style={{width:'20%'}} className='registerbtn' type="button">Post</button>
      
    </div>
  )
}

export default Post