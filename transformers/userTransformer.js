
let validUser=(userData)=>{
   usertransformdata={
       username:userData.username,
       token:userData.token,
   }
    return usertransformdata;
}

let validSignIn=(userData)=>{
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


let userDetailToAdmin=(userData)=>{
    transformedUserData={
        uuid:userData.uuid,
        name:userData.name,
        username:userData.username,
    }

    return transformedUserData;
}



module.exports={
    validUser,
    validSignIn,
    userDetailToAdmin
}



