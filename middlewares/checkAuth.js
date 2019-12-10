const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
//check try block
    const token=req.headers.authorization;
    let tokenData=token.split(" ")[1]; //remove Bearer- get tocken
    let decodedData=jwt.verify(tokenData,"asddd"); //verify to verify and decode
    req.headerData=decodedData; //role | userid fetch from headerData
    next();

   
}
