const {
    getApplications
  } = require("../services/application");
  

  const getCandidates=async(req,res,next)=>{

    let jobUuid=req.params.job_id;
    let extractedApplications=await getApplications(jobUuid,req);
    if(extractedApplications.validator){
        res.success(200,"Success",extractedApplications.data,extractedApplications.metadata);
    } else {
      res.error(404,"Failed",extractedApplications.error);
    }
  }


  module.exports={
      getCandidates
  }