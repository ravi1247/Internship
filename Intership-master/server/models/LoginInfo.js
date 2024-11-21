const mongoose = require('mongoose')

const { Schema } = mongoose;

const LoginSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        browser: {
            type:String,
             default:"",
        },
        os:{
           type:String,
           default:"",
        },
        device:{
            type:String,
           default:"",
        },
        ip:{
            type:String,
            default:""
        },
        timestamp:{
             type:Date,
             default:Date.now()
        }
    });

const LoginInfo = mongoose.model("login", LoginSchema);
LoginInfo.createIndexes();
module.exports = mongoose.model("login", LoginSchema);