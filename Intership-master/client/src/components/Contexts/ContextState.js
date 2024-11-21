import React, { useEffect, useState } from 'react'
import context from './Context'


function ContextState(props) {


  const [sidebaropen, setsidebaropen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInEmp, setLoggedInEmp] = useState(false);
  const [hamburgerVisible, sethamburgerVisible] = useState(false);
  const [width, setwidth] = useState(window.innerWidth);
  const [applications, setApplications] = useState([]);
  const [user, setuser] = useState([]);
  const [userPosts, setuserPosts] = useState([]);
  const [authentic,setAuthentic]=useState(false)

  window.addEventListener('resize', () => {
    setwidth(window.visualViewport.width);
  })
  useEffect(() => {
    if (width < 800) {
      sethamburgerVisible(true);
    }
    else {
      sethamburgerVisible(false)
    }
  }, [width])
  const onclikhamburger = () => {
    if (sidebaropen) {
      document.getElementById('sidebar1').classList.add('sidebar2');
      setTimeout(() => {
        let ele = document.getElementById('hamburger')
        if (ele) {
          ele.style.display = 'block'
        }
        document.getElementById('sidebar1').classList.remove('sidebar2');
        setsidebaropen(false);
      }, 900);
    }
    else {
      let ele = document.getElementById('hamburger')
      if (ele) {
        ele.style.display = 'none'
      }
      setsidebaropen(true);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("tokenCand")) {
      setLoggedIn(true);
    }
    else {
      setLoggedIn(false);
    }
    if (localStorage.getItem("tokenEmp")) {
      setLoggedInEmp(true);
    }
    else {
      setLoggedInEmp(false);
    }
  },[])
 
  const [change,setChange]=useState(0);

  const Jobposts = {};
  const Internposts = {};
  const [data, setdata] = useState([]);
  useEffect(() => {
    const func = async () => {
      const response = await fetch('/api/posts/getall', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      // console.log(window.onload)
      let json = await response.json();
      setdata(json.posts);
      // data.forEach(element => {
      //   if(element.JoOrIntern=="Job")
      //   {
      //     // console.log("Job",element.category,element);
      //     if(!Jobposts[element.category]){
      //       Jobposts[element.category]=[];
      //     }
      //     Jobposts[element.category].push(element);
      //   }
      //   else
      //   {
      //     // console.log("Intern",element.category,element);
      //     if(!Internposts[element.category]){
      //       Internposts[element.category]=[];
      //     }
      //     Internposts[element.category].push(element);
      //     // Internposts.set(element.category, element);
      //     // console.log(Internposts[element.category]);
      //   }
      // });
      // Jobposts.forEach((value, key) => {
      //   console.log(value);
      // })

    }
    func();
  },[change])

  useEffect(() => {
    const func = async () => {

      let token = "tokenCand";
      let type="Candidate"
      if (loggedInEmp) {
        token = "tokenEmp";
        type="Employee"
      }
      if (!loggedIn && !loggedInEmp) {
        return;
      }

      const response = await fetch("/api/app/getall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authtoken": JSON.stringify(localStorage.getItem(token)),
          "type":type
        }
      })
      const json = await response.json();
      setApplications(json.application);
      const response2 = await fetch("/api/auth/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authtoken": JSON.stringify(localStorage.getItem(token)),
          "type":type
        }
      })
      const json2=await response2.json();
      // console.log(json2.user)
      setuser(json2.user);
      const response3 = await fetch("/api/posts/getpostuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authtoken": JSON.stringify(localStorage.getItem(token)),
          "type":type
        }
      })
      const json3=await response3.json();
      // console.log(json3)
      // console.log(json3.posts)
      if(json.success){

        setuserPosts(json3.posts);
        // console.log(userPosts)
      }
    }
    func();
  }, [loggedIn,loggedInEmp,change])


  return (
    <context.Provider value={{authentic,setAuthentic,change,setChange,userPosts,user,setuser, data, Jobposts,Internposts, applications, loggedInEmp, setLoggedInEmp, loggedIn, setLoggedIn, onclikhamburger, sidebaropen, hamburgerVisible }} >{props.children}</context.Provider>
  )
}

export default ContextState