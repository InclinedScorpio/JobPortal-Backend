//Will control the sigin and signup routes....
// const User=require("../models/User");
const express=require("express");
const app=express();
const { authSignup,authSignin,processUserDetails,resetPass } =require("../services/auth");



let signup = async (req,res,next) => {
    let userData=await authSignup(req.body); 
    if(userData.token==null){
        res.error(422,"unprocessable entity",userData.result);
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



let forgetPassword=async (req,res,next)=>{
    let username=req.body.username;
    let checkAndReset=await processUserDetails(username);
    if(checkAndReset.value){
        res.success(202,"Otp sent Successfully",checkAndReset.data);
    }
    res.error(422,"Failed",checkAndReset.message);

}

let resetPassword=async(req,res,next)=>{
    let resetResponse=await resetPass(req.body);
    if(resetResponse.value){
        res.success(200,"Success",resetResponse.data);
    }
    //ERROR ?? checkimm
    
    res.error(404,"Error",resetResponse.error);
}


module.exports={
    signup,
    signin,
    forgetPassword,
    resetPassword
};


