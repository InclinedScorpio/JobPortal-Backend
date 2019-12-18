//all job related routes will be controlled.
const {
  getJobs,
  applyForJob,
  postNewJob,
  jobsApplied,
  jobsPosted
} = require("../services/job");

const getAllJobs = async (req, res, next) => {
  let jobData = await getJobs(req);
  res.success(200, "Success", jobData.data, jobData.metadata);
};

const applyToJob = async (req, res, next) => {
  let jobId = req.params.job_id;
  let userId=req.headerData.userid;
  let jobDetails = await applyForJob(jobId,userId);
  if (jobDetails.validator) {
    res.success(200, "Successfully Applied", jobDetails.data);
  } else {
    res.error(404, "Failed", jobDetails);
  }
};


const postJob = async (req,res,next)=>{
    let recruiterId=req.headerData.userid;//recruiter id !
    let jobPosted=await postNewJob(recruiterId,req.body);
    if(jobPosted.validator){
        res.success(200,"Successfully Posted", jobPosted.data);
    } else {
        res.error(422,"Failed",jobPosted.error);
    }
}

const appliedJobs=async(req,res,next)=>{
  let candidateUuid=req.headerData.userid;
  let getJobApplied=await jobsApplied(candidateUuid,req);
  if(getJobApplied.validator){
    res.success(200,"Successfully extracted Jobs",getJobApplied.data, getJobApplied.metadata);
    } else {
      res.error(404,"Failed to extract Jobs");
    }
}


const jobsByRecruiter=async(req,res,next)=>{
  let recruiterId=req.headerData.userid;
  let postedJobs=await jobsPosted(recruiterId,req);
  if(postedJobs.validator){
    res.success(200,"Successfully extracted Posted Jobs",postedJobs.data,postedJobs.metadata);
  }else{
    res.error(404,"Failed to extract postedJobs");
  }

}



module.exports = {
    getAllJobs,
    applyToJob,
    postJob,
    appliedJobs,
    jobsByRecruiter
    
};
