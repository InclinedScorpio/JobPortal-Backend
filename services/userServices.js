const Application =require("../models/Application");
const Job=require("../models/Job");
const User=require("../models/User");
const uuid=require("uuid/v1");

const JobRepo =require("../repo/JobRepo");
const UserRepo=require("../repo/UserRepo");
const ApplicationRepo=require("../repo/ApplicationRepo");
const transformer=require("../transformers/userTransformer");

const validator=require("../validators/candidateValidator");

jobRepo=new JobRepo(Job);
userRepo=new UserRepo(User);
applicationRepo=new ApplicationRepo(Application);

module.exports={
    getAllCandidates:async()=>{
        let allCandidates=await userRepo.getUsersByRole(0);
        return {
            data:allCandidates,
            validator:true
        }
    },

    getAllRecruiters:async()=>{
        let allRecruiters=await userRepo.getUsersByRole(1);
        return {
            data:allRecruiters,
            validator:true
        }
    },

    candidateDelete:async(userData)=>{
        //check if uuid exists
        let extractedCandidate=await userRepo.findOne("uuid",userData.candidate_id);
        if(typeof(extractedCandidate)=="undefined"){
                return{
                    code:404,
                    message:"candidate not found",
                    validator:false

                }
        }
        //if uuid is not of candidate
        if(extractedCandidate.role!=0){
            return{
                code:404,
                message:"id doesn't belong to a candidate",
                validator:false
            }
        }
        let saveCandidate=extractedCandidate;
        //now delete the candidate
        let deleteAppli=await applicationRepo.deleteByUserId(extractedCandidate.id);
        let deleteUser=await userRepo.deleteByUuid(extractedCandidate.uuid);
        return{
            message:"candidate deleted successfully",
            validator:true
        };
    },


    recruiterDelete:async(userData)=>{
        let extractedRecruiter=await userRepo.findOne("uuid",userData.recruiter_id);
        if(typeof(extractedRecruiter)=="undefined"){
                return{
                    code:404,
                    message:"Recruiter not found",
                    validator:false

                }
        }
        //if uuid is not of candidate
        if(extractedRecruiter.role!=1){
            return{
                code:404,
                message:"id doesn't belong to a recruiter",
                validator:false
            };
        }
        //id belongs to recruiter and present->extract jobs
        let jobsofRecruiter=await jobRepo.getJobByRecruiterId(extractedRecruiter.id);
        let arr=[];
        for(let i=0;i<jobsofRecruiter.length;i++)
        {
            arr.push(jobsofRecruiter[i].id);
        }
        let deletedApplications=await applicationRepo.deleteGivenJobs(arr);
        let deletedJobs=await jobRepo.deleteByRecruiterId(extractedRecruiter.id);
        let deletedRecruiters=await userRepo.deleteByUuid(userData.recruiter_id);

        return{
            message:"Recruiter deleted successfully",
            validator:true
        }
    
    
    }



    
}