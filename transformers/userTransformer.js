
let validUser=(userData)=>{
   usertransformdata={
       username:userData.username,
       token:userData.token
   }
    return usertransformdata;
}


module.exports={
    validUser
}

