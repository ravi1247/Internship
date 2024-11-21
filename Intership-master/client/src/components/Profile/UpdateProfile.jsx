import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import context from '../Contexts/Context';

function UpdateProfile() {
 
    const cntxt=useContext(context);
    const {change,setChange}=cntxt;

    const [style,setStyle]=useState('adventure');
    const [seed,setseed]=useState('');
    const [show,setShow]=useState(false);
    const [url,setUrl]=useState(`https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`);

    const navigate=useNavigate();

    let token="tokenCand";
    let type="Candidate"
    if(localStorage.getItem('tokenEmp'))
    {
        type="Employee"
        token='tokenEmp';
    }
    const setprofile=async()=>{
        console.log(token)
        const response=await fetch('api/auth/updateprofile',{
            method:"PUT",
            headers:{
                "Content-Type":'application/json',
                "authtoken":JSON.stringify(localStorage.getItem(token)),
                "type":type
            },
            body:JSON.stringify({"picture":url})
        })
        const json=await response.json();
        if(json.success)
        {
            setChange(change+1);
            toast.success("Profile Updated Successfully");
        }
        else{
            toast.error("Some Error occurred");
        }
    }
 const onchangeHandler=async(e)=>{
         const file=(e.target.files)[0]
        const base=await converttoBase64(file)
        console.log(base.length)
        setUrl(base)
 }

  return (
    <div className="jobpost registerPage updateprofile">
        <h1>Select Avtar According to your choice</h1>
        <select onChange={(e)=>{
            setShow(false);
            setStyle(e.target.value);
            setUrl(`https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`)
        }} className='selectOption' name="style" id="">
            <option value="avataaars">Avataaars</option>
            <option value="avataaars-neutral">Avataaars Neutral</option>
            <option value="adventurer">Adventurer</option>
            <option value="adventurer-neutral">Adventurer Neutral</option>
            <option value="big-ears">Big Ears</option>
            <option value="big-ears-neutral">Big Ears Neutral</option>
            <option value="big-smile">Big Smile</option>
            <option value="bottts">Bottts</option>
            <option value="botts-neutral">Bottts Neutral</option>
            <option value="croodles">Croodles</option>
            <option value="croodles-neutral">Croodles Neutral</option>
            <option value="fun-emoji">Fun Emoji</option>
            <option value="icons">Icons</option>
            <option value="identicon">Identicon</option>
            <option value="initials">Initials</option>
            <option value="lorelei">Lorelei</option>
            <option value="lorelei-neutral">Lorelei Neutral</option>
            <option value="micah">Micah</option>
            <option value="miniavs">Miniavs</option>
            <option value="notionists">Notionists</option>
            <option value="notionists-neutral">Notionists Neutral</option>
            <option value="open-peeps">Open Peeps</option>
            <option value="personas">Personas</option>
            <option value="pixel-art">Pixel Art</option>
            <option value="pixel-art-neutral">Pixel Art Neutral</option>
            <option value="rings">Rings</option>
            <option value="shapes">Shapes</option>
            <option value="thumbs">Thumbs</option>
        </select>
        <input onChange={(e)=>{
            setShow(false);
            setseed(e.target.value);
            // if(seed==""){
            //     setUrl(`https://api.dicebear.com/9.x/${style}/svg`)
            // }else{
                setUrl(`https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`)
            // }
        }} style={{width:"30%"}} type="text" name="seed" id="" />
        {/* <button onClick={()=>{
            setShow(true);
            console.log(url)
        }} className='admin'>Search</button> */}
        { show &&
        <>
        
        </>
                
            }
            <>
            <input style={{width:"300px"}} onChange={(e)=>{
                console.log("s")
                onchangeHandler(e)
            }}  accept='.'   type='file'  />
            
            <img style={{width:"20%"}} src={url} alt="" />
            <button style={{width:"150px"}} onClick={()=>{
            setprofile();
            navigate('/profile')
            // window.location.reload();
        }} className='admin'>Set as profile</button>
            </>
    </div>
  )
}

function converttoBase64(file){
    return new Promise((resolve,reject)=>{
        const filereader= new FileReader();
        filereader.readAsDataURL(file)
        filereader.onload=()=>{
            resolve(filereader.result)
        }
        filereader.onerror=(error)=>{
            reject(error)
        }
    })
}

export default UpdateProfile