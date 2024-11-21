
const express = require("express");
const Post=require('../models/Post')
const fetchuser = require("../middleware/fetchuser");
const {RAZORPAY_KEY_ID,RAZORPAY_SECRET_KEY}=require('../config/keys');
const Razorpay=require('razorpay')

const router = express.Router();


router.post('/order',async(req,res)=>{
    // console.log("AA to hain yrr")
    const razorpay=new Razorpay({
        key_id:RAZORPAY_KEY_ID,
        key_secret:RAZORPAY_SECRET_KEY
    })        
    const options={
        amount:req.body.amount,
        currency:req.body.currency,
        receipt:"skdl",
        payment_capture:1
    }
    try {
       const response= await razorpay.orders.create(options);
        
       res.json({
        order_id:response.id,
        currency:response.currency,
        amount:response.amount
       })

    } catch (error) {
        console.log(error.message)
        res.json({error:error.message,success:false})
    }
})


router.get('/payment/:id',async(req,res)=>{
    const id=req.params.id;
    const razorpay=new Razorpay({
        key_id:RAZORPAY_KEY_ID,
        key_secret:RAZORPAY_SECRET_KEY
    }) 
    try {
        console.log(id);
        const payment=await razorpay.payments.fetch(id);
        // console.log(payment)
        if(!payment)
        {
            return res.json({error:"payment not found",success:false});
        }
        res.json({success:true,
            status:payment.status,
            currency:payment.currency,
            amount:payment.amount,
            method:payment.method
        })
         
    } catch (error) {
        console.log(error);
        return res.json({success:false,error:error.message});
    }
    
})


module.exports=router;