import './App.css';
 
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Authentication/Login/Login'
import Register from './components/Authentication/Register/Register';
import InternPage from './components/Internships/InternPage';
import Footer from './components/Footer/Footer';
// import ContextState from './components/Contexts/ContextState';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import HireHome from './components/Hire/Home';
import Post from './components/Hire/Post';
import Plans from './components/Subscriptions/Plans';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import {  useEffect, useState } from 'react';
import Email from './components/Authentication/Verification/Email';
import Phone from './components/Authentication/Verification/Phone';
import context from './components/Contexts/Context';
import JobCard from './components/Jobs/JobCard';
import JobsPage from './components/Jobs/JobsPage';
import ManageApplications from './components/Hire/ManageApplications';
function App() {


  let browser="Chrome";
  function checkBrowser() { 
          
    // Get the user-agent string 
    let userAgentString =  
        navigator.userAgent; 
  
    // Detect Chrome 
    let chromeAgent =  
        userAgentString.indexOf("Chrome") > -1; 
  
    // Detect Internet Explorer 
    let IExplorerAgent =  
        userAgentString.indexOf("MSIE") > -1 ||  
        userAgentString.indexOf("rv:") > -1; 
  
    // Detect Firefox 
    let firefoxAgent =  
        userAgentString.indexOf("Firefox") > -1; 
  
    // Detect Safari 
    let safariAgent =  
        userAgentString.indexOf("Safari") > -1; 
          
    // Discard Safari since it also matches Chrome 
    if ((chromeAgent) && (safariAgent))  
        safariAgent = false; 
  
    // Detect Opera 
    let operaAgent =  
        userAgentString.indexOf("OP") > -1; 
          
    // Discard Chrome since it also matches Opera      
    if ((chromeAgent) && (operaAgent))  
        chromeAgent = false; 
    if(safariAgent)
    {
      browser="Safari"
    }
    if(IExplorerAgent)
    {
      browser="Internet Explorer"
    }
    if(firefoxAgent)
    {
      browser="Firefox"
    }
    if(operaAgent)
    {
      browser="Opera"
    }
   sessionStorage.setItem('browser',browser);
  }
  function isMobile() {
    const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    // console.log(navigator.userAgent)
    return regex.test(navigator.userAgent);
    // console.log(window.innerWidth)
    // return ( ( window.innerWidth <= 500 )  );
  }
  

  function getOS() {
    const userAgent = window.navigator.userAgent,
        platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
        macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = null;
  
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (/Linux/.test(platform)) {
      os = 'Linux';
    }
  
    return os;
  }
  

 const [mobile,setMobile]=useState(false);
 const [dur,setDur]=useState(false);

  const [show,setshow]=useState(false);
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    sessionStorage.setItem('ip',data.ip)
    console.log('Your Public IP Address:', data.ip);
  })
  .catch(error => {
    console.error('Error fetching IP:', error);
  });
    // console.log("dsdkdk")
    sessionStorage.setItem('os',getOS());
     checkBrowser();
     let date= new Date().getHours();
    //  console.log(date)
     if(date<13 && date>=10)
      {
        // console.log("sjdk")
        setDur(true);
      }
      let mb=isMobile();
      if(mb)
      {
        sessionStorage.setItem('device','Mobile')
      }
      else
      {
        sessionStorage.setItem('device','Computer')
      }
      setMobile(mb);
      setshow(true);
      // console.log(mobile,dur,show);
  },[])
  
  return (
    <>
  
     {show && !(mobile && !dur) && <Router>
      <ToastContainer/>
    <Navbar/>
    <Routes>

      <Route path='/jobs' element={<JobsPage/>}/>
      <Route path='/interns' element={<JobsPage/>}/>
      <Route path='/card' element={<JobCard/>}/>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login type="Candidate"/>} />
      <Route path="/loginemployee" element={<Login type="Employee"/>} />
      <Route path="/register" element={<Register type="Candidate"/>} />
      <Route path="/registeremployee" element={<Register type="Employee"/>} />
      <Route path='/hire' element={<HireHome/>}/>
      <Route path='/post' element={<Post/>}/>
      <Route path='/plans' element={<Plans/>}/>
      <Route path='/verifyemail' element={<Email/>}/>
      <Route path='/verifynumber' element={<Phone/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/manage' element={<ManageApplications/>}/>
      <Route path='/updateprofile' element={<UpdateProfile/>}/>
      {/* <Route path="/intern" element={<InternPage title="Campus Ambassador Work From Home Part Time Internship"/>} /> */}
      <Route path="/:id" element={<InternPage title="Campus Ambassador Work From Home Part Time Internship"/>} />
     </Routes>
     <Footer/>
  </Router>}
    {
      !show && <div style={{fontSize:"60px",display:'flex',marginTop:"20vh",position:"relative",justifyContent:"center"}}>Wait While Loading</div>
    }
    {
      (show && (mobile && !dur)) && <div>Website can be accessed between 10Am to 1 pm on this device</div>
    }
    </>
  );
}

export default App;



