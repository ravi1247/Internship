const mongoose = require('mongoose')

const { Schema } = mongoose;

const PostSchema = new Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        role: {
            type: String,
            requireed: true,
            unique: false,
        },
        country: {
            type: String,
            requireed: true,
            unique: false,
        },
        city: {
            type: String,
            requireed: true,
            unique: false,
        },
        category: {
            type: String,
            required: true,
            unique: false,
        },
        company: {
            type: String,
            required: true,
            unique: false,
        },
        workType: {
            type: String,
            required: true,
            unique: false,
        },
        workFrom: {
            type: String,
            required: true,
            unique: false,
        },
        StartDate: {
            type: Date,
            default: Date.now(),
            unique: false,
        },
        Duration:{
               type:Number,
               default:6,
        },
        Stipend:{
            type:Number,
            default:-1
        },
        ApplyBy:{
            type:Date,
            default:Date.now()
        },
        postedAt:{
            type:Date,
            default:Date.now()
        },
        Applications:{
           type:Number,
           default:0,
        },
        JobOrIntern:{
            type:String,
        },
        opennings:{
              type:Number,
        },
        skillsRequired:{
            type:String,
        },
        AbouttheProgram:{
              type:String,
              default:"Love entrepreneurship? Want to spread the word? Join our Campus Ambassador Program! Love entrepreneurship? Want to spread the word? Join our Campus Ambassador Program! Love entrepreneurship? Want to spread the word? Join our Campus Ambassador Program!"
        },
        learning:{
              type:String,
              default:"Love entrepreneurship? Want to spread the word? Join our Campus Ambassador Program! Love entrepreneurship? Want to spread the word? Join our Campus Ambassador Program! Love entrepreneurship? Want to spread the word? Join our Campus Ambassador Program!"
            
        },
        whoCan:{
              type:String,
              default:"Love entrepreneurship? Want to spread the word? Join our Campus Ambassador Program! Love entrepreneurship? Want to spread the word? Join our Campus Ambassador Program! Love entrepreneurship? Want to spread the word? Join our Campus Ambassador Program!"
        },
        perks:{
                 type:String,
                 default:"Completion Certificate"
        }
    });

const Post = mongoose.model("post", PostSchema);
Post.createIndexes();
module.exports = mongoose.model("post", PostSchema);