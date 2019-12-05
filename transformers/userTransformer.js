
let validUser=(userData)=>{
   usertransformdata={
       username:userData.username,
       token:userData.token,
       code:200
   }
    return usertransformdata;
}
validSignIn=(userData)=>{
    usertransformdata={
        userid:userData.uuid,
        username:userData.username,
        name:userData.name,
        role:userData.role,
        token:userData.token,
        value:true
    }
    return usertransformdata;
}



module.exports={
    validUser,
    validSignIn
}

