
const express = require("express");
const Post=require('../models/Post')
const fetchuser = require("../middleware/fetchuser");

const router = express.Router();


router.post('/post',fetchuser,async(req,res)=>{
    try {
       
        let post=await Post.create({
            user:req.user.id,
            role:req.body.role,
            country:req.body.country,
            city:req.body.city,
            category:req.body.category,
            company:req.body.company,
            workType:req.body.workType,
            workFrom:req.body.workFrom,
            Duration:req.body.Duration,
            Stipend:req.body.Stipend,
            ApplyBy:req.body.applyby,
            JobOrIntern:req.body.JobOrIntern,
            skillsRequired:req.body.skillsRequired,
            opennings:req.body.opennings,
            perks:req.body.perks,
            AbouttheProgram:req.body.about,
            learning:req.body.learnings,
            whoCan:req.body.whocan,
        })
       res.status(200).send({"post":post,"success":true});

    } catch (error) {
        // console.log(error.message)
        res.status(501).send({"error":error.message,"success":false});
    }
})

router.get('/getall',async (req,res)=>{
    try {
    let posts=await Post.find();
    res.status(200).send({"posts":posts,"success":true}); 

    } catch (error) {
        res.status(501).send({"error":error.mesage,"success":false});
    }
})
router.get('/getpostuser',fetchuser,async (req,res)=>{
    try {
        let user=req.user.id;
    let posts=await Post.find({user});
    res.status(200).send({"posts":posts,"success":true}); 

    } catch (error) {
        res.status(501).send({"error":error.mesage,"succcess":false});
    }
})


module.exports=router;