//Will control the sigin and signup routes....
// const User=require("../models/User");
const express=require("express");
const app=express();
const { authSignup,authSignin } =require("../services/authServices");



let signup = async (req,res,next) => {

    let userData=await authSignup(req.body); 
    if(userData.token==null){
        res.error(422,"unprocessabele entity",userData.result);
    }else{
        res.success(200,"Success",userData);
    }
}

let signin= async (req,res,next) => {

    let userData=await authSignin(req.body); //get username,pass
    if(userData.value){//SUCCESS
        res.success(200,"Signin Successful",userData);
    }else{
        res.error(401,"Signin failed",userData.error);
    }
}

module.exports={
    signup,
    signin
};


