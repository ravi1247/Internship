
const express = require("express");
const User = require("../models/User");
const Application=require('../models/Application')
const fetchuser = require("../middleware/fetchuser");
const Post = require("../models/Post");

const router = express.Router();


router.post('/apply',fetchuser,async(req,res)=>{
    let success=false;
    try {
        const id=req.body.id;
        const userid=req.user.id;
        const user=await User.findById(userid);
        let checkApp=await Application.find({user:userid,postId:id})
        console.log(userid);
        console.log(id);
        if(checkApp.length){
            console.log(checkApp)
            return res.status(500).send({"error":"Already applied","success":false})
        } 
        let application=await Application.create({
             user:req.user.id,
             postId:req.body.id
        })
        success=true;
        let newuser;
        if(user.countRem==1)
        {
            newuser= await User.findByIdAndUpdate(userid,{Subscription:"Expire",countRem:0});
        }
        else{
            if(user.Subscription!='Gold')
            {
                newuser= await User.findByIdAndUpdate(userid,{countRem:user.countRem-1});
            }
        }
        const post=await Post.findById(id);
        console.log(id)
        const updatedPost=await Post.findByIdAndUpdate(id,{Applications:post.Applications+1});
       return res.status(200).send({newuser,success});
    } catch (error) {
        console.log(error.message);
        return res.status(501).send({error,success});
    }
})
router.get('/getall',fetchuser,async(req,res)=>{
    let success=false;
    try {
        const user=req.user.id;
       let application=await Application.find({user}).populate('postId')
       success=true;
       res.status(200).send({application,success});
    } catch (error) {
        // console.log(error.message);
        res.status(501).send({error,success});
    }
})

router.get('/getallEmp',fetchuser,async(req,res)=>{
    let success=false;
    try {
        const user=req.user.id;
       let application=await Application.find().populate('postId');
       success=true;
       res.status(200).send({application,success});
    } catch (error) {
        // console.log(error.message);
        res.status(501).send({error,success});
    }
})
router.put('/update',async(req,res)=>{
    let success=false;
    try {
        const id=req.body.id;
       let application=await Application.findByIdAndUpdate(id,{status:true});
       success=true;
    //    clg
       res.status(200).send({application,success});
    } catch (error) {
        console.log(error.message);
        res.status(501).send({error,success});
    }
})



module.exports=router;