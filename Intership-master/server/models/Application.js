const mongoose = require('mongoose')

const { Schema } = mongoose;

const ApplicationSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        postId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
          },
        date: {
            type: Date,
            default: Date.now(),
            required: true,
        },
        status:{
           type:Boolean,
           default:false,
        }
    });

const Application = mongoose.model("application", ApplicationSchema);
Application.createIndexes();
module.exports = mongoose.model("application", ApplicationSchema);