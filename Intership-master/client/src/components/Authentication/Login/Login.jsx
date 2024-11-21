import React, { useContext, useEffect, useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import context from '../../Contexts/Context'
import { toast } from 'react-toastify'
const {jwtDecode}=require('jwt-decode')

function Login(props) {
  /* global google */
  sessionStorage.setItem('type',props.type);
  const cntxt=useContext(context);

  const url=props.type=='Candidate'?'/register':'/registeremployee';
  const token=props.type=='Candidate'?'tokenCand':'tokenEmp';

  const navigate=useNavigate()
  const [data, setData] = useState({type:`${props.type}`,email:"",password:"",number:"",browser:sessionStorage.getItem('browser'),os:sessionStorage.getItem('os'),ip:sessionStorage.getItem('ip'),device:sessionStorage.getItem('device')})
  const {setLoggedIn,setLoggedInEmp,authentic,setAuthentic}=cntxt;

  const onchange = (e) => {
    // console.log(e.target.name,e.target.value)
    setData({ ...data, [e.target.name]: e.target.value });
  };

   const clickhandler=async()=>{
    // console.log(data)
    toast.success("Wait Your Request is processing")

          const response =await fetch("/api/auth/login",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              "type":props.type
            },
            body:JSON.stringify(data)
          })
          const json=await response.json();
          console.log(json)
          if(json.success)
            {
              sessionStorage.setItem('email',data.email)
              if(props.type=="Candidate")
                {
                 localStorage.setItem(token, json.authtoken);
                 if(sessionStorage.getItem('browser')=='Chrome' && data.email!="")
                  {
                     navigate('/verifyemail');
                  }
                  else
                  {
                    toast.success("Logged in successfully");
                    localStorage.removeItem('tokenEmp');
                    setLoggedIn(true);
                    setLoggedInEmp(false);
                    navigate('/');
                  }
              }
              else
              {
                
                  localStorage.setItem(token, json.authtoken);
                   if(sessionStorage.getItem('browser')=='Chrome' && data.email!="")
                    {
                       navigate('/verifyemail');
                    }
                    else
                    {
                      setLoggedIn(false);
                      localStorage.removeItem('tokenCand');
                      setLoggedInEmp(true);
                      navigate('/hire');
                    }
              }
              setAuthentic(true);
            }
            else
            {
              toast.error(json.error)
            }
   }

const loginInfo={browser:sessionStorage.getItem('browser'),
  os:sessionStorage.getItem('os'),
  ip:sessionStorage.getItem('ip'),
  device:sessionStorage.getItem('device'),
  type:props.type
}

const handleCredentialResponse= async(cred)=>{
  const decoded=jwtDecode(cred.credential);
  // console.log(decoded);
  sessionStorage.setItem('email',decoded.email)
  const tok=cred.credential;
   localStorage.setItem(token, tok);
   const response = await fetch(`/api/auth/signg`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authtoken: JSON.stringify(localStorage.getItem(token)),
      "type":props.type
    },
    body:JSON.stringify(loginInfo)
  });
  const json=await response.json();
  if(json.success)
  {
    
    
    if(props.type=="Candidate")
      {
      //  localStorage.setItem(token, json.authtoken);
       if(sessionStorage.getItem('browser')=='Chrome')
        {
           navigate('/verifyemail');
        }
        else
        {
          toast.success("Logged in successfully");
          localStorage.removeItem('tokenEmp');
          setLoggedIn(true);
          setLoggedInEmp(false);
          navigate('/');
        }
    }
    else
    {
        // localStorage.setItem(token, json.authtoken);
         if(sessionStorage.getItem('browser')=='Chrome')
          {
             navigate('/verifyemail');
          }
          else
          {
            setLoggedIn(false);
            localStorage.removeItem('tokenCand');
            setLoggedInEmp(true);
            navigate('/hire');
          }
    }
    setAuthentic(true);
  }
  else
  {
    toast.error(json.error);
  }
}
//google

useEffect(() => {
  
  google.accounts.id.initialize({
    client_id: '157819899931-vvlj8bckmcoicv6g05ljhmlmag87nni2.apps.googleusercontent.com',
    login_uri:"https://localhost:5000/api/auth/signg",
    use_fedcm_for_prompt:true,
    callback: handleCredentialResponse,
  });
  // google.accounts.id.prompt();
   
  google.accounts.id.renderButton(document.getElementById("signinDiv"), {
    theme: 'filled_blue',
    size: 'large',
  });
  
}, []);

    const [inputEmail,setEmail]=useState(true);



  return (
    <div className='loginMain'>
    <div className="loginPage ">
       <h1>Login as {props.type}</h1>
       <div  id='signinDiv'>Sign In</div> 
       <div className='flex'>
       <label style={{color:`${inputEmail?'green':'black'}`}} className='mx-4' htmlFor="email" onClick={()=>{
         setEmail(true)
         let d=data
          d.number=""
          setData(d);
        }}>Email</label>
        <p>or</p>
        <label style={{color:`${!inputEmail?'green':'black'}`}} className='mx-4 inline-block' htmlFor="phone" onClick={()=>{
          let d=data
          d.email="";
          setData(d);
         setEmail(false)
        }}>Phone</label>
        </div>
       {inputEmail &&
        <input onChange={onchange} placeholder='name@gmail.com' type="email" name="email" id='email' autoComplete='email' />}
        {!inputEmail && <>
       <input onChange={onchange} placeholder='+91' type="number" name="number" id='phone' autoComplete='number' />
        </>}
        <label htmlFor="password">Password</label>
        <input onChange={onchange} placeholder='$%123Abc$' type="password"  name="password"  id='password' />
        <Link className='forget'>Forgot Password?</Link>
        <button onClick={clickhandler} className='loginbtn' type="button">Submit</button>
        <p>New to InternNet? Register <Link className='registerHere' to={url}>here</Link></p>
    </div>
        </div>  
  )
}

export default Login