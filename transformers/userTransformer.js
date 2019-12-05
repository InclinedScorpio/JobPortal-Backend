
let validUser=(userData)=>{
   usertransformdata={
       username:userData.username,
       token:userData.token,
       code:200
   }
    return usertransformdata;
}


module.exports={
    validUser
}

