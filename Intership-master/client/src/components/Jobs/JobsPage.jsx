import React, { useContext, useEffect, useState } from 'react'
import './JobsPage.css'
import JobCard from './JobCard'
import context from '../Contexts/Context'

function JobsPage() {

    const cntxt=useContext(context);
    const {data}=cntxt;
    const [dis,setdis]=useState(data);
    // console.log(data);
    // console.log(dis);
    const [filters,setfiilters]=useState({duration:"",location:"",stipend:"",wfh:0,pt:0,role:""})
    const getMatch=(filter,ele)=>{
        // console.log(filter.ept)
        
        if(wfh && ele.workFrom.toLowerCase()!='work from home')
        {
            return false;
        }
        // console.log(filter.stipend)
        if(filter.stipend !="" && ele.Stipend<sal)
        {
            return false;
        }
        if(pt && ele.workType.toLowerCase() != 'part time')
        {
            return false;
        }
        // console.log(filter.duration)
        if(filter.duration!="" && filter.duration<ele.Duration)
        {
            return false;
        }
        if(filter.location!="" && ele.city.toLowerCase().search(filter.location.toLowerCase())==-1)
        {
               return false;
        }
        if(filter.role!="" && ele.role.toLowerCase().search(filter.role.toLowerCase())==-1)
        {
               return false;
        }

           if(window.location.pathname=='/jobs')
            {
                return ele.JobOrIntern=='Job';
            }
            else{
                return ele.JobOrIntern=='Intern';
            }
        return true;
    }
    // console.log(data)
    const [wfh,setwfh]=useState(false);
    const [pt,setpt]=useState(false);
    const [sal,setsal]=useState(0);
    
    useEffect(() => {
        // console.log(window.location.pathname)
         const fdata=data.filter((ele)=>{
                   return getMatch(filters,ele)
         })
         setdis(fdata)
        //  console.log(dis)
    }, [filters,data,window.location.pathname])
    const onchange = (e) => {
        setfiilters({ ...filters, [e.target.name]: e.target.value });
      };

    return (
        <div className="jobspage">
            <div className="registerPage filters">
            
                <label htmlFor="role">Profile</label>
                <input  onChange={onchange} placeholder='e.g. Marketing' name='role' type="text" />
                <label htmlFor="location">Location</label>
                <input onChange={onchange} placeholder='e.g. Delhi' name='location' type="text" />
                <div className='checkinput'>
                    <input type="checkbox"  onChange={(e)=>{
                        setwfh(e?.target.checked)
                    }} name="wfh" id="" />
                    <label htmlFor="workFrom">Work From home</label>
                </div>
                <div className='checkinput'>
                    <input type="checkbox"  onChange={(e)=>{
                        setpt(e.target.checked);
                    }} name="pt" id="" />
                    <label htmlFor="workType">Part-Time</label>
                </div>
                <label htmlFor="stipend">Desired minimum monthly stipend (₹)</label>
                <div className="stipendrange">
                    <input type="range" name="stipend"  id="" onChange={(e)=>{
                        setsal(e.target.value*100);
                        // console.log(sal)
                        onchange(e);
                    }} />
                    <div className='rangevalues'>
                        <li>0</li>
                        <li>2k</li>
                        <li>4k</li>
                        <li>6k</li>
                        <li>8k</li>
                        <li>10k</li>
                    </div>
                </div >
                <label htmlFor="startDate">Starting From(or after)</label>
                <input type="date" name="startDate" id="" />
                <label htmlFor="Duration">Max. duration (months)</label>
                <input onChange={onchange} type="number" name="duration" id="" />
                <div className='checkinput'>
                    <input type="checkbox" name="internwithjob" id="" />
                    <label htmlFor="internwithjob">Internship With job Offer</label>
                </div>
                <div className='checkinput'>
                    <input type="checkbox" name="fastresponse" id="" />
                    <label htmlFor="fastresponse">Fast response</label>
                </div>
                <div className='checkinput'>
                    <input type="checkbox" name="earlyapplicant" id="" />
                    <label htmlFor="earlyapplicant">Early applicant</label>
                </div>
                <div className='checkinput'>
                    <input type="checkbox" name="forwoman" id="" />
                    <label htmlFor="forwoman">Internship for woman</label>
                </div>
                <button>
                    clear all
                </button>
            </div>
            <div className="searches">
                <h1 className='searcheshead'>{dis.length} Total {window.location.pathname.slice(1)}</h1>
                <div className="results">
                   {
                    dis.map((ele)=>{
                        return <JobCard data={ele}/>
                    })
                   }
                </div>
            </div>
        </div>

    )
}

export default JobsPage