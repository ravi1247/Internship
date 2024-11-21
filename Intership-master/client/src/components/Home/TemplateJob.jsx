import React, { useContext, useEffect, useState } from 'react'
import "./TemplateJob.css"
// import {Link} from "react"
import Card from './Card'
import context from '../Contexts/Context'
import { Link } from 'react-router-dom'

function TemplateJob(props) {
  
  const cntxt=useContext(context);
  const {data}=cntxt;

  const fdata=data?.filter(ele=>ele.JobOrIntern==props.name)
  const [disData,setDisData]=useState(fdata);

 const [categ,setCateg]=useState("All");
 useEffect(() => {

    // console.log(fdata)
      if(categ=='All')
      {
        setDisData(fdata);
      }
      else
      {
        setDisData(fdata.filter((ele)=>{
          return (ele.category==categ)
        }))
      }
 },[categ,data])

 

  return (
    <div className="template">
        <div className="categories">
        <span><strong> Popular categories :</strong></span>
       <ul>
        <li onClick={(e)=>{
          console.log(e.target.innerHTML)
          setCateg(e.target.innerHTML);
        }}><Link>All</Link> </li>
        <li 
        onClick={(e)=>{
          console.log(e.target.innerHTML)
          setCateg(e.target.innerHTML);
        }}><Link>MBA</Link> </li>
        <li onClick={(e)=>{
          setCateg(e.target.innerHTML);
        }}><Link>Media</Link> </li>
        <li onClick={(e)=>{
          setCateg(e.target.innerHTML);
        }}><Link>Engineering</Link> </li>
        <li onClick={(e)=>{
          setCateg(e.target.innerHTML);
        }}><Link>Design</Link></li>
        <li onClick={(e)=>{
          setCateg(e.target.innerHTML);
        }}><Link>Data Science</Link></li>
       </ul>
        </div>
        <div className="jobCards">
            {
               disData?.map((element,index)=>
              {
                return  <Card data={element} ind={index} key={index}/>
              })
            }
        </div>
    </div>
  )
}

export default TemplateJob