const bcrypt=require("bcrypt");
const uuid=require("uuid/v1");
const UserRepo = require('../repo/User');
const uservalidator=require("../validators/userValidator");
const transformer=require("../transformers/userTransformer");
const jwt=require("jsonwebtoken");
const Otp=require("../models/Otp");
const sendMail=require("../utilities/sendMail");//for smtp mail 
const  otplib=require("otplib");//to get otp
const User=require("../models/User");
const otpRepo=require("../repo/otp");
const dotenv = require('dotenv');
dotenv.config();


// const Job=require("../models/Job");
// const Application=require("../modelsApplication");

const userRepo = new UserRepo(User);
const OtpRepo=new otpRepo(Otp);

//all methods inside will be async as having await(because further calling async)
//Also because we want to wait till it completes the work.
module.exports={
  authSignup: async(signupData)=>{

    let validatedresponse=uservalidator.newAccount(signupData);

    if(validatedresponse.value){
      if(signupData.role=="2"){
        let isUserExist=await userRepo.adminExists();
        if((isUserExist)!==undefined){
          let temp={
            code:422,
            field:"username",
            result:"Admin already added",
            token:null
          };
          return temp;               
        }
      }

    const hash = await bcrypt.hash(signupData.password, 10);
    signupData.password = hash;
    signupData.uuid=uuid();

 
      let isUserExist=await userRepo.findAndSelect("username",signupData.username,[],0);
      if(isUserExist.length>0){
          let temp={
            code:422,
            field:"username",
            result:"Username Already Exists",
            token:null
          };
          return temp;
                      
      }
      //ELSE PART
      const alpha=await userRepo.create(signupData);

      const token=jwt.sign(
      {role:signupData.role, userid:signupData.uuid},
      process.env.JWT_PASS,{ expiresIn:"1h"});

      signupData["token"]=token;
      const userdata= transformer.validUser(signupData);
      return userdata;



    }else{
      return validatedresponse;
    }
  },


  //SIGN IN FOR USER --------------------------------------------------------------
  //-------------------------------------------------------------------------------

  authSignin: async (signinData)=>{
 
            let validateData=uservalidator.signupValidate(signinData);

            if(!validateData.value){
              return validateData;
            }

            let isUserExist=await userRepo.findOne('username',signinData.username);

            if(isUserExist){//USER EXISTS!
              //check username and password
              const hash=isUserExist.password;
               const result = await bcrypt.compare(signinData.password, hash);
                  
                  if(result==true){//grant login

                    let token=jwt.sign({ role:isUserExist.role,userid:isUserExist.uuid}
                    ,process.env.JWT_PASS,{expiresIn:"1h"});
                    isUserExist["token"]=token;
                    let userData=transformer.validSignIn(isUserExist);
                    return await userData;
                  }else{//USER WRONG CREDENTIALS
                    return {
                      code:401,
                      error:"unauthorized access",
                      value:false,
                    };
                  }
            }else{//NO SUCH USERNAME
              return {
                code:404,
                error:"user doesn't exists",
                value:false
              }
            }
   },

   //---FORGET PASSWORD-----------------------------------------------------
   //-----------------------------------------------------------------------


   processUserDetails:async(userName)=>{

    validateUsername=uservalidator.validateUser(userName);
    if(!validateUsername.value){
      return{
        message:"Email is invalid, try again"
      }
    }

      //check email exists
    let isEmailExists=await userRepo.mailExists(userName);
    if(isEmailExists.length<=0){
      return{
        message:"Email doesn't exist, please signup ",
        value:false
      }
    }
    //email exists--Generate OTP--------------------
    const secret = process.env.OTP_SECRET;
    const token = parseInt(otplib.authenticator.generate(secret));
    //insert the token in db
    const saveOTP=await OtpRepo.create({otp: token,name: userName});
    let otpsent=await sendMail.sendEmailTo(userName,token);
    return{
      email:otpsent.email,
      data:otpsent,
      value:true
    }

  },



  resetPass:async(resetData)=>{
    let username=resetData.username;
    let otp=parseInt(resetData.otp);
    let password=resetData.password;

    //check if everything there.->Validator

    let verifiedData=uservalidator.checkResetData(resetData);
    if(!verifiedData.validator){
        return{
          error:verifiedData.error,
          value:false
        }
    }

    //everything present check if email exist !
    let EmailExists=await OtpRepo.checkUsernameAndOTP(username,otp);
    if(typeof(EmailExists)=="undefined"){
      return{
        error:"OTP doesn't exists",
        value:false
      }
    }

    //check otp timings
    var currentdatetime = new Date();
    var otpdatetime = new Date(EmailExists.created_at);

    if(EmailExists.otp!=otp){
      return{
        error:"OTP can't be verified, try again",
        value:false
      }
    }
    var diffHours = parseInt((currentdatetime - otpdatetime) / (1000 * 60 * 60));
    if(diffHours>1){
      let deleteOTP=await OtpRepo.removeOTP(username,otp);
      return{
        error:"OTP expired.",
        value:false
      }
    }
    //both username and otp exists!!
    const hash = await bcrypt.hash(password, 10);
    let storedData=await userRepo.updatePassword(hash,username);
    let deleteOTP=await OtpRepo.delete("email",username);
    
    return{
      data:{
      message:"Password updated Successfully",
      email:username,
      },
      value:true
    }




  }


}//module exports

