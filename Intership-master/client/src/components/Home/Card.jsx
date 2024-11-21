import React, { useEffect } from 'react'
import "./Card.css"
import { Link } from 'react-router-dom'

function Card(props) {
    const {data}=props;
    // console.log(data)
    return (
        <div className="Jobcard">
                        <div className='hiringtag'><i className="bi bi-arrow-up-right"></i> Actively Hiring</div>

            <div className='jobtitle'>{data.role}</div>
            <div>
               {data.company}
            </div>

            <div className="line"></div>

            <ul className='jobCardDetails'>            
                <li><i  className="bi bi-geo-alt"></i> {data.country}, {data.city}</li>
                <li><i className="bi bi-cash-coin"></i> {data.Stipend==-1?'Not mentioned':data.Stipend}</li>
                <li><i className="bi bi-calendar-fill"></i> 6 months</li>
            </ul>
            <div className="bottomEle">
                <ul>
                    <li className='titlename'>{data.JobOrIntern}</li>
                    <li className='titlelink'>
                        <Link to={`/${data._id}`}>View Details <i className="bi bi-box-arrow-up-right"></i></Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Card