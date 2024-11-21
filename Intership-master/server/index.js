const express=require('express')
const path=require('path')
const app=express()
var cors=require('cors')
app.use(cors())
app.use(express.json({'limit':'50mb'}))
const bodyParser = require('body-parser');


const mongoose =require('mongoose')
// console.log('first')
const dotenv = require("dotenv");
dotenv.config();
const { JWT_SECRET, MONGODB_URI } = require("./config/keys");
// console.log(JWT_SECRET)
// const connectparams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };

app.use(bodyParser.json({
    limit: '50mb'
  }));
  
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
  }));

 mongoose.set('strictQuery', 'true');

const connectToMongo=()=>{
    mongoose.connect(MONGODB_URI).then(()=>{
        console.log("Connected to Mongo Successfully")
    }).catch(
        (error)=>{
            console.log(error)
        }
    )
}

connectToMongo();

const PORT=process.env.PORT|| 5000


app.use('/api/auth',require('./routes/auth'))
app.use('/api/app',require('./routes/apply'))
app.use('/api/posts',require('./routes/post'))
app.use('/api/pay',require('./routes/payments'))


// console.log(path.resolve(__dirname, "../client", "build"))
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "../client", "build")));
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

app.listen(PORT,()=>{
    console.log("Server started at port:",PORT);
})