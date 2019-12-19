
let validUser=(userData)=>{
   usertransformdata={
       id:userData.uuid,
       token:userData.token,
       role:userData.role,
       email:userData.email,
       name:userData.name
   }
    return usertransformdata;
}

let validSignIn=(userData)=>{
    usertransformdata={
        id:userData.uuid,
        email:userData.email,
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
        email:userData.email,
    }
    return transformedUserData;
}

let userDetailsToSend=(userData)=>{

    for(let i=0;i<userData.length;i++)
    {
        userData[i]["id"]=userData[i]["uuid"];
        delete userData[i].uuid;
    }
    let temp={};
    temp["results"]=userData;
    return temp;

}



module.exports={
    validUser,
    validSignIn,
    userDetailToAdmin,
    userDetailsToSend
}



