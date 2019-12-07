
let validUser=(userData)=>{
   usertransformdata={
       username:userData.username,
       token:userData.token,
       code:200
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

let appliedCandidates=(candidateData)=>{
    transformeddata={
        name:candidateData.name,
        username:candidateData.username,
        candidateId:candidateData.uuid,
    }
    return transformeddata;
}



module.exports={
    validUser,
    validSignIn,
    appliedCandidates
}

/***
 * picking up the correct attributes,
 * {
 * error: true/ false,
 * result: {actual result}
 * }
 * 
 */

