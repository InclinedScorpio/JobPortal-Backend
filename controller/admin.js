const{
    getAllApplications
}=require("../services/application");

const{
    getAllCandidates,
    getAllRecruiters,
    candidateDelete,
    recruiterDelete
}=require("../services/user");

const{
    jobDelete
}=require("../services/job");


const extractedApplications=async(req,res,next)=>{
    const allApplications=await getAllApplications(req);
    if(allApplications.validator){
        res.success(200,"Applications Retrieved",allApplications.data);
    }
}
const extractedCandidates=async(req,res,next)=>{
    const allCandidates=await getAllCandidates(req);
    if(allCandidates.validator){
        res.success(200,"Candidates Retrieved",allCandidates.data,allCandidates.metadata);
    }
}
const extractedRecruiters=async(req,res,next)=>{
    const allRecruiters=await getAllRecruiters(req);

    if(allRecruiters.validator){
        res.success(200,"Recruiters Retrieved",allRecruiters.data,allRecruiters.metadata);
    }
}

const deleteCandidate=async(req,res,next)=>{
    const deletedCandidate=await candidateDelete(req.params);
    if(deletedCandidate.validator){
        res.success(200,"Success",deletedCandidate.message);
    } else {
        res.error(deletedCandidate.code,"Failed",deletedCandidate.message);
    }
}


const deleteRecruiter=async(req,res,next)=>{
    const deletedRecruiter=await recruiterDelete(req.params);
    if(deletedRecruiter.validator){
        res.success(200,"Success",deletedRecruiter.message);
    } else {
        res.error(deletedRecruiter.code,"Failed",deletedRecruiter.message);
    }

}

const deleteJob=async(req,res,next)=>{
    const deletedJobs=await jobDelete(req.params);
    if(deletedJobs.validator){
        res.success(200,"success",deletedJobs.message);
    } else {
        res.error(deletedJobs.code,"Failed",deletedJobs.message);
    }
}




module.exports={
    extractedApplications,
    extractedCandidates,
    extractedRecruiters,
    deleteCandidate,
    deleteRecruiter,
    deleteJob
}