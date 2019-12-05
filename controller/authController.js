// const User=require("../models/User");
const express=require("express");
const app=express();
const { authSignup } =require("../services/authServices");



let signup = async (req,res,next) => {

    let userData=await authSignup(req.body); 
    if(userData.token==null){
        res.error(422,"unprocessabele entity",userData);
    }else{
        res.success(200,"Success",userData);
    }
}

// let signin =async(req,res,next)=>{
//     let userdetails={
//         username: req.body.username,
//         password: req.body.password,
//         role: req.body.role,
//         name: req.body.name
//     }
//     candidaterepo.signin(req.body);
// }

module.exports={
    signup
};




















// const bcrypt = require('bcrypt');
// const express=require("express");
// const User=require("../models/User.js");
// app=express();
// const bodyParser=require("body-parser");
// const uuid=require("uuid/v1");//acc. to timestamp

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());


// const signup = async (req,res,next) => {
//     const username=req.body.username;

//     //for bcrypt
//     const saltRounds = 10;
//     const myPlaintextPassword = req.body.password;
 
//     const name=req.body.name;
//     const role=parseInt(req.body.role);
//     const uuidnew=uuid();
//     var hashedpassword;
//     bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//       hashedpassword=hash;
//     });
//     const newUser=await User.query().insert({
//         uuid:uuidnew,
//         name:name,
//         username:username,
//         password:hashedpassword,
//         role:role       
//      });   

//     //  res.succes()
//     //  res.error()
//     //  res.send({
//     //      error: 'dskfns'
//     //  })
//  }


// // exports.get_signup_page=(req,res,next)=>{
// //     res.status(200).json({
// //         message:"Here you can Signup for an account"
// //     });
// // }


// //  exports.get_signin_page=(req,res,next)=>{
// //         res.status(200).json({
// //             message: "You got inside sign-in page"
// //         });
// //  }

//  const signin= async (req,res,next)=>{
//        
// }