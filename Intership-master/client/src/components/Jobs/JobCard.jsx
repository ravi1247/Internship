import React from 'react'
import './Jobcard.css'
import { Link } from 'react-router-dom';

function JobCard(props) {
  const {data}=props;
  return (
    <div className="jobcard">
        <div className="jobrole"><Link to={`/${data._id}`}><h1>{data.role}</h1></Link> </div>
        <div className="companyname">{data.company} &nbsp;
        <div className='hiringtag activetag'> <i className="bi bi-arrow-up-right"></i> Actively Hiring</div></div>
        
        <div className="jobcarddetails">
            <li><i className="bi bi-geo-alt"/> &nbsp;{data.workFrom}</li>
            <li><i className="bi bi-calendar-fill"/>&nbsp;{data.Duration} Months</li>
            <li><i className="bi bi-cash-coin"/>&nbsp;{data.Stipend}/month</li>
        </div>
        <div className="jobcarddetails">
            <li style={{background:'#f4eded',borderRadius:'20px',padding:'2px'}}><i class="bi bi-clock-history"></i>Posted 3 weeks ago</li>
            <li>{data.workType}</li>
        </div>
    </div>
  )
}

export default JobCard