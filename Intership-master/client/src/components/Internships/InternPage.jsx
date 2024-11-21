import React, { useContext, useEffect, useState } from 'react'
import "./InternPage.css"
import { useNavigate, useParams } from 'react-router-dom'
import context from '../Contexts/Context';
import { toast } from 'react-toastify';

function InternPage(props) {
  const cntxt = useContext(context);
  const { applications,data,user,setuser,change,setChange} = cntxt;
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id)
  // console.log(applications)
  const newdata = data.filter(ele => ele._id == id)
  const application = newdata[0];
  // console.log(application)
  const [atp, setatp] = useState([]);
  const [skills, setskills] = useState([]);
  const [learnings, setlearnings] = useState([]);
  const [canApply, setcanApply] = useState([]);
  const [perks, setperks] = useState([]);
  const [applied,setApplied]=useState(false);
  useEffect(() => {
    // console.log("sec",application)
    if(application)
    {
      // let date=new Date();
      // console.log(date.toISOString())
      // console.log(new Date(application.StartDate));
      // console.log();
      setatp(application.AbouttheProgram.split('.'));
      setskills(application.skillsRequired.split(','));
      setperks(application.perks.split(','));
      setcanApply(application.whoCan.split('.'));
      setlearnings(application.learning.split('.'));
    }  
  }, [application])
  useEffect(() => {
    // console.log("first",applications)
    if(applications)
    {
      applications?.forEach(element => {
        // console.log(element.postId._id,"dddddd",id);
        if(element?.postId?._id==id)
          {
            setApplied(true);
            return;
          }
        });
      }
  }, [applications])
  

  const clickApply=async()=>{
    if(user.Subscription=='Expire')
    {
      navigate('/plans');
      toast.warn("Subscribe to Apply your previous plan has Expired");
      return;
    }
    if(!localStorage.getItem('tokenCand')){
      toast.error("Login as Candidate to apply");
    }
    const response=await fetch('api/app/apply',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authtoken":JSON.stringify(localStorage.getItem('tokenCand')),
        "type":"Candidate"
      },
      body:JSON.stringify({"id":id})
    })
    const json=await response.json();
    if(json.success)
    {
      setuser(json.newuser);
      setApplied(true);
      setChange(change+1);
      toast.success("Applied SuccessFully");
    }
    else{
      toast.error(json.error);
    }
  }
  return (
    <div className="internPage">
      <div className="pageTitle">
        <h1>{application?.role}  {application?.workFrom}</h1>
      </div>
      <div className="InternPageBox">
        <ul>
          <div className='internhead'>
            <div className='hiringtag'><i className="bi bi-arrow-up-right"></i> Actively Hiring</div>
            <h2>{application?.role}</h2>

            <p>{application?.company}</p>
            <p>{application?.workFrom}</p>
          </div>
          <div className='basicInfointern'>
            <li>
              <div><i class="bi bi-play-circle"></i> start Date</div>
              <p>{application?.StartDate.slice(0, 10)}</p>
            </li>
            <li>
              <div><i className="bi bi-calendar-fill"/> Duration</div>
              <p> {application?.Duration} months</p>
            </li>
            <li>
              <div><i className="bi bi-cash-coin"/> Stipend</div>
              <p>{application?.Stipend == -1 ? "Performance Based" : application?.Stipend}</p>
            </li>
            <li>
              <div><i class="bi bi-hourglass-split"></i> Apply By</div>
              <p>{application?.ApplyBy.slice(0, 10)}</p>
            </li>
          </div>
          <div className='basicInfointern tagsIntern' >
            <li style={{background:'#f4eded',borderRadius:'5px',padding:'2px'}}><i class="bi bi-clock-history"></i>&nbsp; Posted 3 weeks ago</li>
            <li style={{background:'#f4eded',borderRadius:'5px',padding:'2px'}}>{application?.workType}</li>
            <li style={{background:'#f4eded',borderRadius:'5px',padding:'2px'}}>{application?.JobOrIntern}</li>
          </div>
          <div className="basicInfointern">

            <li><i class="bi bi-people-fill"></i> {application?.Applications} Applicants</li>
          </div>
          <div className="line"></div>
        </ul>

        <div className="abouttheprogram">
          <h2>About the Program</h2>
          {
            atp.map((ele,index)=>{
              return <p>{index+1}. {ele}</p>
            })
          }
        </div>
        <div className="abouttheprogram">
          <h2>learning Oppurtunity</h2>
          {
            learnings.map((ele,index)=>{
              return <p>{index+1}. {ele}</p>
            })
          }
        </div>
        <div className="abouttheprogram">
          <h2>Skills Required</h2>
          <div className='skillrequired' >
          {
            skills.map((ele,index)=>{
              return <p style={{background:'#f4eded',borderRadius:'5px',padding:'2px'}}>{ele}</p>
            })
          }
          </div>
        </div>
        <div className="abouttheprogram">
          <h2>Who can Apply</h2>
          {
            canApply.map((ele,index)=>{
              return <p>{index+1}. {ele}</p>
            })
          }
        </div>
        <div className="abouttheprogram">
          <h2>Perks</h2>
          <div className='skillrequired' >
            {
            perks.map((ele)=>{
              return <p style={{background:'#f4eded',borderRadius:'5px',padding:'2px'}} >{ele}</p>
            })
          }
          </div>
        </div>
        <div className="abouttheprogram">
          <h2>Number of Opennings</h2>
          <div className='skillrequired' >
            <p>{application?.opennings}</p>
          </div>
          <button
            onClick={() => {
              // console.log("Skd")
              clickApply();
              // window.location.reload();
            }}
            disabled={applied} style={{opacity:`${applied?0.7:1}`}}  className='applybtn'>{applied?"Applied":"Apply"}</button>
        </div>
      </div>
    </div>
  )
}

export default InternPage