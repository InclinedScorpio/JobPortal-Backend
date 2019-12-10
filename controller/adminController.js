const{
    getAllApplications
}=require("../services/applicationServices");

const{
    getAllCandidates,
    getAllRecruiters,
    candidateDelete,
    recruiterDelete
}=require("../services/userServices");

const{
    jobDelete
}=require("../services/jobServices");


const extractedApplications=async(req,res,next)=>{
    const allApplications=await getAllApplications();
    if(allApplications.validator){
        res.success(200,"Applications Retrieved",allApplications.data);
    }
}
const extractedCandidates=async(req,res,next)=>{
    const allCandidates=await getAllCandidates();
    if(allCandidates.validator){
        res.success(200,"Candidates Retrieved",allCandidates.data);
    }
}
const extractedRecruiters=async(req,res,next)=>{
    const allRecruiters=await getAllRecruiters();

    if(allRecruiters.validator){
        res.success(200,"Recruiters Retrieved",allRecruiters.data);
    }
}

const deleteCandidate=async(req,res,next)=>{
    const deletedCandidate=await candidateDelete(req.params);
    if(deletedCandidate.validator){
        res.success(200,"Success",deletedCandidate.message);
    }
    res.error(deletedCandidate.code,"Failed",deletedCandidate.message);
}


const deleteRecruiter=async(req,res,next)=>{
    const deletedRecruiter=await recruiterDelete(req.params);
    if(deletedRecruiter.validator){
        res.success(200,"Success",deletedRecruiter.message);
    }
    res.error(deletedRecruiter.code,"Failed",deletedRecruiter.message);

}

const deleteJob=async(req,res,next)=>{
    const deletedJobs=await jobDelete(req.params);
    if(deletedJobs.validator){
        res.success(200,"success",deletedJobs.message);
    }
    res.error(deletedJobs.code,"Failed",deletedJobs.message);
}




module.exports={
    extractedApplications,
    extractedCandidates,
    extractedRecruiters,
    deleteCandidate,
    deleteRecruiter,
    deleteJob
}