const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult, header } = require('express-validator');
var fetchUser = require('../Middleware/fetchUser');
var jwt = require('jsonwebtoken');


const JWT_SECRET = "Iamabadcop";

//Route 1:Create a User using: POST "/api/auth/createuser". Dosent require Auth. No login required.

router.post('/createuser',[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('password','Password must contain atleast 5 characters ').isLength({ min: 5 }),],
    async(req,res)=>{
  // If there are errors, return Bad request and the error

    const errors = validationResult(req);
    let success =false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // Check whether the user with the email already exist

    try {
      
    let user = await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({success,error:"Sorry the user with this email already exists."})
    }

    
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    // creating user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password:secPass,
      });

      const data = {
        user:{
          id: user.id
        }
      }
      const awthtoken = jwt.sign(data,JWT_SECRET);
      success = true;
      res.json({success,awthtoken})
      
      // .then(user => res.json(user)).catch(err=>{console.log(err) 
      //   res.json({error:'Please enter a unique value for email', message: err.message})})

    // res.json(user)
  }
  catch ($error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!!");
  }

    
})

//Route 2:Authenticate a  User using: POST "/api/auth/login". Dosent require Auth. No login required.

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
  ],async(req,res)=>{
       // If there are errors, return Bad request and the error

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    let success = false;
    try {
      
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({success,error:"Please try to Login with correct credentials"});
        
      }

      const passwordCompare = await bcrypt.compare(password,user.password);
     
      if(!passwordCompare){
        success = false;
        return res.status(400).json({success, error:"Please try to Login with correct credentials"});
      }
      
      const data = {
        user:{
          id: user.id
        }
      }
      const awthtoken = jwt.sign(data,JWT_SECRET);
      success = true;
      res.json({success, awthtoken})

      
    } catch ($error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!!");
  }

  })

//Route 3:Get Loggedin User details using: POST "/api/auth/getUser". login required.

router.post('/getUser', fetchUser ,async(req,res)=>{
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)   
    } catch ($error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!!");
  }
  })
module.exports = router