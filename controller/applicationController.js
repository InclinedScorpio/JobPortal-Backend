const {
    getApplications
  } = require("../services/applicationServices");
  

  const getCandidates=async(req,res,next)=>{
    let jobUuid=req.params.id;
    // let recruiterUuid=req.headerData.userid;
    let extractedApplications=await getApplications(jobUuid);
    if(extractedApplications.validator){
        res.success(200,"Success",extractedApplications);
    }
    res.error(404,"Failed",extractedApplications);
  }







  module.exports={
      getCandidates
  }