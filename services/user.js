const Application =require("../models/Application");
const Job=require("../models/Job");
const User=require("../models/User");
const uuid=require("uuid/v1");

const JobRepo =require("../repo/Job");
const UserRepo=require("../repo/User");
const ApplicationRepo=require("../repo/Application");
const transformer=require("../transformers/userTransformer");

const validator=require("../validators/candidateValidator");
const pagination=require("../transformers/pagination");


jobRepo=new JobRepo(Job);
userRepo=new UserRepo(User);
applicationRepo=new ApplicationRepo(Application);

module.exports={
    getAllCandidates:async(user)=>{

        let page=user.query.page;//by user
                let limit=user.query.limit;//by user 
                let offset=(page)*limit;

                let pageDetail={
                    limit:parseInt(user.query.limit),
                    page:parseInt(page),
                    offset:parseInt(offset)
                }


        let allCandidates=await userRepo.findAndSelect("role",0,["uuid","name","username"],pageDetail);
        let transformedData=transformer.userDetailsToSend(allCandidates.results);
        transformedData["total"]=allCandidates.total;
        allCandidates=pagination.paginateResponse(allCandidates,pageDetail);



        //temp
        // let allJobs=await jobRepo.getAllJobs(pageDetail);
        // let trasformedData=jobTransformer.jobData(allJobs.results);
        // trasformedData["total"]=allJobs.total;
        // allJobs=pagination.paginateResponse(trasformedData,pageDetail);

        return {
            data:allCandidates.data,
            metadata:allCandidates.metadata,
            validator:true
        }
    },

    getAllRecruiters:async(user)=>{
        let page=user.query.page;//by user
        let limit=user.query.limit;//by user 
        let offset=(page)*limit;

        let pageDetail={
            limit:parseInt(user.query.limit),
            page:parseInt(page),
            offset:parseInt(offset)
        }


        let allRecruiters=await userRepo.findAndSelect("role",1,["uuid","name","username"],pageDetail);
        // allRecruiters["total"]=allRecruiters.total;
        // allRecruiters=pagination.paginateResponse(allRecruiters,pageDetail);

        let transformedData=transformer.userDetailsToSend(allRecruiters.results);
        transformedData["total"]=allRecruiters.total;
        allRecruiters=pagination.paginateResponse(allRecruiters,pageDetail);

        return {
            data:allRecruiters.data,
            metadata:allRecruiters.metadata,
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
        let deleteUser=await userRepo.delete("uuid",extractedCandidate.uuid);
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
        let jobsofRecruiter=await jobRepo.findAndSelect("id",extractedRecruiter.id,["id"],0);
        let arr=[];
        for(let i=0;i<jobsofRecruiter.length;i++)
        {
            arr.push(jobsofRecruiter[i].id);
        }

        let deletedApplications=await applicationRepo.deleteGivenJobs(arr);
        let deletedJobs=await jobRepo.delete("recruiter_id",extractedRecruiter.id);

        let deletedRecruiters=await userRepo.delete("uuid",userData.recruiter_id);

        return{
            message:"Recruiter deleted successfully",
            validator:true
        }
    
    
    }



    
}