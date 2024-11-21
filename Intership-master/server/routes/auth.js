const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, EMAIL_PASSWORD, USER_EMAIL } = require('../config/keys');
const fetchuser = require("../middleware/fetchuser");
// const os=require('os');
const LoginInfo = require("../models/LoginInfo");
// console.log(os.type())
const router = express.Router();
router.post(
  "/register",
  body("name", "Must be three characters long").isLength({ min: 3 }),
  body("email", "must be a valid email").isEmail(),
  body("password", "must be 5 characters long").isLength({ min: 5 }),
  async (req, res) => {
    let success = false;
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors[0].msg);
      res.status(400).send(errors);
    } else {
      const email = req.body.email;
      const type = req.header('type');
      let user = await User.find({ email, type });
      // console.log(user.length);
      if (user.length != 0) {
        // console.log("dkdk")
        return res.status(400).send({ error: "User already exists with this email" });
      } else {
        const number = req.body.number;
        user = await User.find({ number, type });
        console.log(user);
        if (user.length != 0) {
          // console.log("dkdk2")
          return res.status(400).send({ error: "User already exists with this phone number" });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const secPass = bcrypt.hashSync(password, salt);
        //  console.log("FD")
        let user1 = await User.create({
          type: type,
          name: req.body.name,
          email: req.body.email,
          number: req.body.number,
          password: secPass,
        });
        // console.log("FD")
        const data = {
          user: {
            id: user1.id,
          },
        };
        success = true;
        // console.log(data)
        const logininf = await LoginInfo.create({
          user: user1.id,
          os: req.body.os,
          ip: req.body.ip,
          browser: req.body.browser,
          device: req.body.device
        })
        const authtoken = jwt.sign(data, JWT_SECRET);
        const dataaa = jwt.decode(authtoken);
        // console.log(dataaa);
        res.json({ success, authtoken });
      }
    }
  }
);


router.get('/getcand', async (req, res) => {
  try {

    let users = await User.find({ type: "Candidate" });
    res.send(users);

  } catch (error) {
    res.status(501).send({ "error": error.message })
  }
})
router.get('/getemp', async (req, res) => {
  try {

    let users = await User.find({ type: "employee" });
    res.send(users);

  } catch (error) {
    res.status(501).send({ "error": error.message })
  }
})

router.post(
  "/login",
  body("password", "Password must not be empty").isLength({ min: 5 }),
  async (req, res) => {
    // console.log(req);
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      // console.log("aa Gye");
      return res.status(400).send({ error: errors });
    }
    let success = false;
    const password = req.body.password;
    try {
      // console.log(user);
      let user;
      const email = req.body.email;
      const number = req.body.number;
      const type = req.header('type');
      console.log(email)
      console.log(number)
      if (email != "") {
        console.log("email se")
        user = await User.findOne({ email, type });
      }
      else {
        console.log("number se")
        user = await User.findOne({ number, type });
      }
      // res.status(400).send({error:"eee"});
      if (!user) {
        return res.status(400).send({ error: "Enter Valid Credentials" });
      }
      const passcmp = await bcrypt.compare(password, user.password);
      if (!passcmp) {
        return res.status(400).send({ error: "Enter Valid Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      // console.log(data);
      const logininf = await LoginInfo.create({
        user: user.id,
        os: req.body.os,
        ip: req.body.ip,
        browser: req.body.browser,
        device: req.body.device
      })
      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(authtoken);
      success = true;
      res.status(200).send({ success, authtoken });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

router.get("/getuser", fetchuser, async (req, res) => {
  let success = false;
  try {
    // console.log("first fir Se");
    const userid = req.user.id;
    // console.log(userid);
    const user = await User.findById(userid).select("-password");
    // console.log("qq"+user);
    success = true
    return res.send({ user, success });
  } catch (error) {
    // console.log("Good Bye");

    // console.log(error.message);
    res.status(500).send({ error: "Unable to fetch user Details" });
  }
});

router.post("/signg", fetchuser, async (req, res) => {
  // console.log("aa to gye");
  let success = false;
  try {
    const email = req.user.email;
    if (email != undefined) {
      res.status(500).send({ "error": "User not exist register first", "success": false })
    }
    success = true;
    const logininf = await LoginInfo.create({
      user: req.user.id,
      os: req.body.os,
      ip: req.body.ip,
      browser: req.body.browser,
      device: req.body.device
    })
    res.status(200).send({ success });
  } catch (error) {
    // console.log("Good Bye");
    res.status(500).send({ "error": error.message, "success": success });
  }
});


router.put("/deposit", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    let user = await User.findById(userid);
    if (user) {
      const amount = parseFloat(req.body.amount);
      user = await User.findByIdAndUpdate(userid, { amount: amount + user.amount });
      user = await User.findById(userid);
      res.send(user);
    }
    else {
      res.status(400).send({ error: "Account not found" });
    }

  } catch (error) {
    res.send({ error: error.message });
  }
})

router.put("/withdraw", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    let user = await User.findById(userid);
    if (user) {
      const amount = parseFloat(req.body.amount);
      // console.log(typeof amount);
      // console.log(user.amount);
      if ((amount > user.amount) || user.amount === 0) {
        return res.status(400).send({ error: "You can not withdraw more than Your current balance or account is empty" });
      }
      user = await User.findByIdAndUpdate(userid, {
        amount: user.amount - amount,
      });
      user = await User.findById(userid);
      res.send(user);
    }
    else {
      res.status(400).send({ error: "Account not found" });
    }

  } catch (error) {
    res.send({ error: error.message });
  }
})


router.put("/update", fetchuser, async (req, res) => {
  let success = false;
  try {
    const userid = req.user.id;
    const password = req.body.password;
    const newname = req.body.name;
    const newnumber = req.body.number;
    const salt = await bcrypt.genSalt(10);
    const secPass = bcrypt.hashSync(password, salt);
    let user;
    if (password == "") {
      user = await User.findByIdAndUpdate(userid, { name: newname, number: newnumber });
    }
    else {
      user = await User.findByIdAndUpdate(userid, { name: newname, password: secPass, number: newnumber });
    }
    // console.log(secPass);
    // console.log(user);
    success = true;
    res.status(200).send({ success, user });

  } catch (error) {
    res.send({ success, error });
  }
})

router.put("/updateprofile", fetchuser, async (req, res) => {
  // console.log("yaha to aa gye");
  let success = false;
  try {
    const userid = req.user.id;
    const npicture = req.body.picture;
    let user = await User.findByIdAndUpdate(userid, { picture: npicture });
    success = true;
    res.status(200).send({ success, user });

  } catch (error) {
    res.send({ success, error });
  }
})
router.put("/subscribe", fetchuser, async (req, res) => {
  console.log("yaha to aa gye");

  let success = false;
  try {
    const userid = req.user.id;
    const plan=req.body.plan;
    console.log(plan);
    // console.log(req.body.plan);
    let cnt;
    if (plan == 'Bronze') {
      cnt = 3;
    }
    if (plan == 'Silver') {
      cnt = 5;
    }
    if (plan == 'Gold') {
      cnt = 100;
    }
    let user = await User.findByIdAndUpdate(userid, { Subscription: plan, countRem: cnt });
    // console.log(user)
    success = true;
    res.status(200).send({ success, user });

  } catch (error) {
    res.send({ success, error });
  }
})

router.get('/logininfo', fetchuser, async (req, res) => {
  let success = false;
  // console.log("d")
  try {
    const user = req.user.id;
    const info = await LoginInfo.find({ user });
    success = true;
    res.status(200).send({ info, success });

  } catch (error) {
    console.log(error.message)
    return res.status(500).send({ "error": error.message, "success": false })
  }
})



const nodemailer = require('nodemailer');


const mailOtp = {};
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: USER_EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

router.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  mailOtp[email] = otp;

  const mailOptions = {
    from: USER_EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      return res.status(500).send({ message: 'Error sending email', success: false });
    }
    res.status(200).send({ message: 'OTP sent', success: true });
  });
});

router.post('/send-bill', (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const mailOptions = {
    from: USER_EMAIL,
    to: email,
    subject: 'Your Subscription Bill',
    text: `Bill generated for your current subscription.
    The details are below:
    method:${req.body.method},plan:${req.body.plan},currency:${req.body.currency}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      return res.status(500).send({ message:error.message, success: false });
    }
    res.status(200).send({ message: 'Bill sent', success: true });
  });
});


router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (mailOtp[email] == otp) {
    delete mailOtp[email];
    return res.status(200).send({ message: 'OTP verified', success: true });
  }
  res.status(400).send({ message: 'Invalid OTP', success: false });
});


module.exports = router;
