
module.exports={

    isCandidate:(req,res,next)=>{
        console.log("###############",req.headerData.role);
        let role=req.headerData.role;
        if(role==0){
         return  next();
        }
        res.error(401,"failed","You are not a candidate");
    },
    isRecruiter:(req,res,next)=>{
        let role=req.headerData.role;
        if(role==1){
          return   next();
        }
        res.error(401,"failed","You are not a recruiter");
    },

    isAdmin:(req,res,next)=>{
        let role=req.headerData.role;
        if(role==2){
           return  next();
        }
        res.error(401,"failed","You are not an Admin");
    },

    isAdminOrCandidate:(req,res,next)=>{
        let role=req.headerData.role;
        if(role==2||role==0){
            return next();
        }
        res.error(401,"failed","You are not a Candidate or Admin");
    }

}