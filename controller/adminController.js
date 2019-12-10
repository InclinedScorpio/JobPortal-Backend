const{
    getAllApplications
}=require("../services/applicationServices");

const{
    getAllCandidates,
    getAllRecruiters
}=require("../services/userServices");


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




module.exports={
    extractedApplications,
    extractedCandidates,
    extractedRecruiters
}