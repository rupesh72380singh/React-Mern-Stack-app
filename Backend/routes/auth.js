const express = require('express');
const User = require('../models/User');

const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const JWT_SECRET = "harryisgoodb$oy";


var fetchuser = require('../middleware/fetchuser')
// const User = require('../models/User')

// Authencation a user  using :Post "api/auth/createuser" . no login required
router.post('/createuser',[
    body('name', "enter the valid name").isLength({ min: 3}),
    body('email',"enter the valid email").isEmail(),
    body('password', " password must be at least 5").isLength({ min: 5}),
], async (req ,res)=>{
    let success = false;
    const errors= validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ success ,errors:errors.array()});
    }
    try {
    let user = await User.findOne({email:req.body.email}) ;
    console.log(user)
    if(user){
        return res.status(400).json({success,error:"sorry a user with this emsil already exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password , salt)
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    });
    const data = {
        user:{
            id:user.id
        }
    }
    const authtoken = jwt.sign(data , JWT_SECRET) 
    // const jwtData = jwt.sign(data , JWT_SECRET) 
    // res.json({user});
    // console.log(jwtData)
    success= true;
    res.json({success, authtoken})
}
catch(error){
    console.error(error.message);
    res.status(500).send("some error occured")
}
    
    // .then(user=> res.json(user))
    // .catch( err=>{console.log(err)
    // res.json({error: "please enter the valid email", message:err.message})})
    // res.send(req.body);
  
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
    // res.send("hello")
});

// Authencation a user  using :Post "api/auth/login" . no login required
router.post('/login',[
    // body('name', "enter the valid name").isLength({ min: 3}),
    body('email','enter the valid email').isEmail(),
    body('password', 'password can not be blank').exists()
],   async(req ,res)=>{
    let success = false;
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email , password} = req.body;
    try {
        // const {email , password} = req.body;
        let user =   await User.findOne({email});
        if(!user){
            // res.json(authtoken)
            return res.status(400).json({error :"please try to login correct Credential1"})
        }
        const passwordCompare =   bcrypt.compare(password , user.password);
        if(!passwordCompare){
            success:false;
            return res.status(400).json({error:"please try to login with corrrect Credential9"})
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data , JWT_SECRET);
        success = true;
        res.json(success, authtoken);
        console.log(authtoken)

        
    }catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured")
}
});
// get  a userdetail  using :Post "api/auth/getuser" . no login required
router.post('/getuser' ,fetchuser ,async (req ,res)=>{
    // body('name', "enter the valid name").isLength({ min: 3}),,
     
try {
    userId =' req.user.id'
    const user = await User.findById(userId).select("-password");
    res.send(user)
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("interval server error")
} 
})
    

    

module.exports = router;