//all job related routes will be controlled.
const {
  getJobs,
  applyForJob,
  postNewJob,
  jobsApplied
} = require("../services/jobServices");

const getAllJobs = async (req, res, next) => {
  let jobData = await getJobs(req);
  res.success(200, "Success", jobData);
};

const applyToJob = async (req, res, next) => {
  let jobId = req.params.id;
  let userId=req.headerData.userid;
  console.log("&&&&&&&&&&&&&&",userId,"^^^^^^^jobid^",jobId);
  let jobDetails = await applyForJob(jobId,userId);
  if (jobDetails.validator) {
    res.success(200, "Successfully Applied", jobDetails.data);
  }
  res.error(404, "Failed", jobDetails);
};


const postJob = async (req,res,next)=>{
    let recruiterId=req.headerData.userid;//recruiter id !
    let jobPosted=await postNewJob(recruiterId,req.body);
    if(jobPosted.validator){
        res.success(200,"Successfully Posted", jobPosted.data);
    }
    res.error(404,"Failed",jobPosted.error);
}

const appliedJobs=async(req,res,next)=>{
  let candidateUuid=req.headerData.userid;
  let getJobApplied=await jobsApplied(candidateUuid);
  if(getJobApplied.validaor){
    res.success(200,"Successfully extracted Jobs",getJobApplied.data);
    }
    res.error(404,"Failed to extract Jobs");
}



// const submitJob=async(req,res,next)=>{

// }

module.exports = {
    getAllJobs,
    applyToJob,
    postJob,
    appliedJobs
};
