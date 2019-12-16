const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
//check try block
try{
    const token=req.headers.authorization;
    let tokenData=token.split(" ")[1]; //remove Bearer- get tocken
    let decodedData=jwt.verify(tokenData,process.env.JWT_PASS); //verify to verify and decode
    req.headerData=decodedData; 
    next();
}
catch(err){
    res.error(401,"Unauthorized Access");
}

   
}
