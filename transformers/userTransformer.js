
let validUser=(userData)=>{
   usertransformdata={
       id:userData.username,
       token:userData.token,
       role:userData.role
   }
    return usertransformdata;
}

let validSignIn=(userData)=>{
    usertransformdata={
        id:userData.uuid,
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
        id:userData.uuid,
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



