const bcrypt=require("bcrypt");
const uuid=require("uuid/v1");
const UserRepo = require('../repo/UserRepo');
const uservalidator=require("../validators/userValidator");
const transformer=require("../transformers/userTransformer");
const jwt=require("jsonwebtoken");
const User=require("../models/User");

// const Job=require("../models/Job");
// const Application=require("../modelsApplication");

const userRepo = new UserRepo(User);

//all methods inside will be async as having await(because further calling async)
//Also because we want to wait till it completes the work.
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
      {username:signupData.username, userid:signupData.uuid},
      "asddd",{ expiresIn:"500h" });

      signupData["token"]=token;
      const userdata= transformer.validUser(signupData);
      return userdata;

    }else{
      return validatedresponse;
    }
    // candidateRepo.insert(signupdata);
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
              console.log(isUserExist)
              const hash=isUserExist.password;
               const result = await bcrypt.compare(signinData.password, hash);
                  
                  if(result==true){//grant login

                    let token=jwt.sign({ userid:isUserExist.uuid,role:isUserExist.role}
                    ,"asddd",{expiresIn:"500h"});
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
   }
}//module exports

