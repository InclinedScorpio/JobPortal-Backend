const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
    try{ //Jwt throws error if header not there....

    const token=req.headers.authorization;
    let tokenData=token.split(" ")[1]; //remove Bearer- get tocken
    
    let decodedData=jwt.verify(tokenData,"asddd"); //verify to verify and decode
    req.headerData=decodedData; //role | userid fetch from headerData
    next();

    }catch(err){ //Incorrect Token!
       return res.error(401,"Not Authorized","token can't be verified");
    }
}
