import React from 'react'
import "./Home.css"
import first from "../../Assets/slide1.png"
import second from "../../Assets/slide2.webp"
import third from "../../Assets/slide3.webp"
import fourth from "../../Assets/slide4.webp"
import TemplateJob from './TemplateJob'

function Home() {
     
    // <div className="ele"></div>
    // console.log(navigator)

    return (
        <div className="home">
            <div className="head1">
                <h1>Elevate Your Career : One Click Away from Success</h1>
                <h2>Trending On InterNet Today 🔥</h2>
            </div>

            <div className="slider">
                <div className="cards">
                    <img src={first} alt="" />
                    <img src={second} alt="" />
                    <img src={third} alt="" />
                    <img src={fourth} alt="" />
                </div>
                <div className="arrows">
                    <i className="bi bi-arrow-left-circle-fill"></i>
                    <i className="bi bi-arrow-right-circle-fill"></i>
                </div>
            </div>
            <div className="letestIntern">
                <div className="head1"><h1>Latest InternShips On InterNet</h1></div>
                <TemplateJob name="Intern"/>
            </div>
            <div className="letestJob">
                <div className="head1"><h1>Latest Jobs On InterNet</h1></div>
                <TemplateJob name="Job"/>
            </div>
            <div className="stats">
                <div className="hiring head2">
                    <h1>300K+</h1>
                    <p>Companies Hiring</p>
                </div>
                <div className="openings head2">
                    <h1>10K+</h1>
                    <p>new openings everyday</p>
                </div>
                <div className="students head2">
                    <h1>21Mn+</h1>
                    <p>Active Students</p>
                </div>
                <div className="learners head2">
                    <h1>600K+</h1>
                    <p>Learners</p>
                </div>
            </div>
        </div>
    )
}

export default Home