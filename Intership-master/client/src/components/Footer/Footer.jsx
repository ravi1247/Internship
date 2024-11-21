import React from 'react'

import "./Footer.css"

function Footer() {
    return (
        <div className="footer">
            <div className="footer1">
                <div className="box1 my-7">Empower Your Career with InternNet today</div>
                <div className="buttons">
                    <button className='register my-5'>Register</button>
                    <button className='login my-5'>Login</button>
                </div>
            </div>
            <div className='footer2  bg-gray-800'>
                <ul>
                    <h2>Jobs By Places</h2>
                    <li>Delhi</li>
                    <li>Lucknow</li>
                    <li>Pune</li>
                    <li>Kolkata</li>
                    <li>Mumbai</li>
                    <li>Gurugram</li>
                    <li>Noida</li>
                    <li>Bangalore</li>
                    <li>Hyderabad</li>
                </ul>
                <ul>
                    <h2 >Internships By Places</h2>
                    <li>Delhi</li>
                    <li>Lucknow</li>
                    <li>Pune</li>
                    <li>Kolkata</li>
                    <li>Mumbai</li>
                    <li>Gurugram</li>
                    <li>Noida</li>
                    <li>Bangalore</li>
                    <li>Hyderabad</li>
                </ul>
                <ul>
                    <h2>Jobs By Stream</h2>
                    <li>Computer Science</li>
                    <li>Electronics</li>
                    <li>Mechanics</li>
                    <li>Civil</li>
                    <li>Electrical</li>
                    <li>Marketing</li>
                    <li>Chemical</li>
                    <li>Design</li>
                    <li>Finance</li>
                </ul>
                <ul>
                    <h2>Internships By Stream</h2>
                    <li>Computer Science</li>
                    <li>Electronics</li>
                    <li>Mechanics</li>
                    <li>Civil</li>
                    <li>Electrical</li>
                    <li>Marketing</li>
                    <li>Chemical</li>
                    <li>Design</li>
                    <li>Finance</li>
                </ul>
            </div>
            <div className="line"></div>
                <div className="footer2 bg-gray-800">
                    <ul>
                        <li>About Us</li>
                        <li>We are hiring</li>
                        <li>Hire interns for your company</li>
                        <li>Post a job</li>
                    </ul>
                    <ul>
                        <li>Team Diary</li>
                        <li>Blog </li>
                        <li>Our Services</li>
                    </ul>
                    <ul>
                        <li>Terms And Conditions</li>
                        <li>Privacy </li>
                        <li>Contact Us</li>
                    </ul>
                    <ul>
                        <li>SiteMap</li>
                        <li>College TPO registration </li>
                        <li>List of Companies</li>
                    </ul>
                </div>
                <div className='footerBottom bg-gray-800'>
                 <div className='social'>
                <i className="bi bi-linkedin"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-facebook"></i>
                <i className="bi bi-youtube"></i>
                <i className="bi bi-twitter-x"></i>
                 </div>
                <p className='copyright '>© Copyright 2024 InterNet</p>
                </div>
        </div>
    )
}

export default Footer