const User =require('../models/User');
const jwt = require('jsonwebtoken');

const fetchuser =async (req, res, next) => {
    // console.log(req);
    // console.log("sorry aaye hain ")
    // console.log(req.protocol+req.hostname+req.path+req.originalUrl+req.subdomains)     // "https"
//   console.log()     // "example.com"
//   console.log()         // "/creatures"
//   console.log()  // "/creatures?filter=sharks"
//   console.log()   // "['ocean']"
    let success=false;
    try {
        let token = req.header('authtoken');
        // console.log(token)
        // console.log(token)
           if (!token)
            {
                return res.status(401).send({ success, error: "Authentication denied" });
            }
        let data=jwt.decode(JSON.parse(token));
        // console.log("kkkk")
        // console.log(data);
        // console.log(req.body);
        // console.log(token,"dd")
        if(data.email == undefined)
            {
                // console.log(data.user)
                req.user = data.user;
            }
            else
            {
                const email=data.email;
                const type=req.header('type');
                // console.log(type);
                // console.log(email)
                let user=await User.findOne({email,type});
                // console.log(user);
            if(user != null )
            {
                const finUser={
                    user:{
                        id:user.id
                    }
                }
                req.user = finUser.user;
            }
            else
            {
                console.log('Yaha hai error')
                return res.status(500).send({"error":"User Not Exist register first","success":false})
            }
        }
           
        next();
    } catch (error) {
        // console.log("Error yhi hai")
        
        console.log(error.message);
        return res.status(500).send({ error,success});
    }
}

module.exports = fetchuser;