const bcrypt=require("bcrypt");
const uuid=require("uuid/v1");
const UserRepo = require('../repo/UserRepo');
const uservalidator=require("../validators/userValidator");
const transformer=require("../transformers/userTransformer");
const jwt=require("jsonwebtoken");
//importing all models CHECK

// const Job=require("../models/Job");
const User=require("../models/User");
// const Application=require("../modelsApplication");

const userRepo = new UserRepo(User);

//all methods inside will be async as having await(because further calling async)
module.exports={
  authSignup: async(signupData)=>{

    let validatedresponse=uservalidator.newAccount(signupData);

    if(validatedresponse.value){
    //replace password with hashed password and insert user-uuid
    const hash = await bcrypt.hash(signupData.password, 10);
    // console.log(hash)
    signupData.password = hash;
    signupData.uuid=uuid();
    // ->calling userValidator.js file

    // console.log(signupData)
  //validation passed
      let isUserExist=await userRepo.findByUsername(signupData.username);
      if(isUserExist.length>0){
          return {
            code:422,
            field:"username",
            message:"Username Already Exists",
            token:null
          };            
      }
      //ELSE PART
      const alpha=await userRepo.create(signupData);

      const token=jwt.sign(
        {username:signupData.username, userid:signupData.uuid},
          "asddd",{ expiresIn:"500h" });

      signupData["token"]=token;
      const userdata= transformer.validUser(signupData);
      return userdata;

    }else{
      return validatedresponse;
    }
    // candidateRepo.insert(signupdata);
  }




  // signin: async(signinData)=>{
  //           const username=signinData.username;
  //           const password=signinData.password;
        
  //           //CHECKING USERNAME AND PASSWORD
  //           const userfound=await User.query()
  //           .select("password")
  //           .where("username",username);
        
  //           if(userfound>0){ //USERNAME EXIST !
  //           const userfoundpass=userfound[0].password;
        
  //               bcrypt.compare(password, userfoundpass, function(err, res) {
  //                   if(res==true){ //PASSWORD IS CORRECT !
  //                       res.status(200).json({
  //                           message: "User successully logged in"
  //                       });
  //                   }else{ //PASSWORD IS WRONG !
  //                       res.status(404).json({
  //                           message:"Auth failed -> Wrong password entered"
  //                       });
  //                   }
  //               });
  //          }else{
  //              res.status(404).json({
  //                   message:"Auth failed -> No username exist"
  //              });
  //          }
  // }


}//module exports

