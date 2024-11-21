const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false,
        },
        type:{
              type:String,
              required:true,
        },
        email: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
            default: null
        },
        Subscription:{
            type:String,
            default:"Free"
        },
        countRem:{
                  type:Number,
                  default:1
        },
        password: {
            type: String,
            unique: false,
            default: null
        },
        date: {
            type: Date,
            default: Date.now(),
            required: true,
        },
        picture: {
            type: String,
            default: "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1696077818~exp=1696078418~hmac=485f46cbe800d22ce26e0fef07fd93a343bcce09ba1419555c1e46ec3e40eacf",
        }
    });

const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = mongoose.model("user", UserSchema);