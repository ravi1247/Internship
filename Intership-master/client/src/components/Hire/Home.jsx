import React, { useContext } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import first from '../../Assets/logos.svg'
import context from '../Contexts/Context'

function Home() {
 
   const cntxt=useContext(context);
   const {loggedInEmp}=cntxt;

    return (
        <div className='hireTalent'>
            <div className="hireDiv">
                <div className="headhire">
                    <h1><em>Hire Interns & Freshers <span className='text-blue-400'>Faster</span></em></h1>
                    <h2>Post Internships for Free & Hire Talent with up to 2 Years of Experience</h2>
                {!loggedInEmp && <div className="loginSignUp"><Link to='/loginemployee'><em>Login As Employer</em></Link></div>}
                { loggedInEmp && <div className="loginSignUp"><Link to='/post'><em>Post Job</em></Link></div>}
                { loggedInEmp && <div className="loginSignUp"><Link to='/manage'><em>Manage Applications</em></Link></div>}
                { loggedInEmp && <div className="loginSignUp"><Link onClick={(e)=>{
                    e.preventDefault();

                    localStorage.removeItem('tokenEmp')
                    window.location.reload();
                }}><em>Log Out</em></Link></div>}
                </div>
            </div>
            <div className="whyhire mt-64 ">
                <h1>Why Hire from InterNet?</h1>
                <h2>Post your intern requirements and build your dream team with ease.</h2>
                <div className="whybox">
                    <div className="whyboxele candidatesIntern">
                        <h1 className='counts'>25 Mn+</h1>
                        <p>candidates looking for Internships</p>
                    </div>
                    <div className="whyboxele candidatedHired">
                    <h1 className='counts'>1.7 Mn+</h1>
                    <p>candidates hired
                    PAN India</p>
                    </div>
                    <div className="whyboxele jobprofile">
                    <h1 className='counts'>200+</h1>
                    <p>Job Profiles</p>
                    </div>
                    <div className="whyboxele companieshiring">
                        <h1 className='counts'>250 K+</h1>
                        <p>Companies Hiring on Internshala</p>
                    </div>
                    <div className="rating">
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-half"></i>
                           &nbsp; 4.5 (2023)
                        </div>
                </div>
            </div>
            <div className="partners">
                <div>
                <h1>Trusted by 3 Lakh+ Startups, SMEs, & MNCs</h1>
                </div>
            </div>
                <img src={first} alt="" />
        </div>
    )
}

export default Home