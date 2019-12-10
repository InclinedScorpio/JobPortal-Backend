const Application =require("../models/Application");
const Job=require("../models/Job");
const User=require("../models/User");
const uuid=require("uuid/v1");

const JobRepo =require("../repo/JobRepo");
const UserRepo=require("../repo/UserRepo");
const ApplicationRepo=require("../repo/ApplicationRepo");
const validator=require("../validators/jobValidator");
const pagination=require("../transformers/pagination");

jobRepo=new JobRepo(Job);
userRepo=new UserRepo(User);
applicationRepo=new ApplicationRepo(Application);

module.exports={
    getJobs:async(user)=>{
        //if admin
        if(user.headerData.role==2){

            let page=user.query.page;//by user
                let limit=user.query.limit;//by user 
                let offset=(page)*limit;

                let pageDetail={
                    limit:parseInt(user.query.limit),
                    page:parseInt(page),
                    offset:parseInt(offset)
                }

              let allJobs=await jobRepo.getAllJobs(pageDetail);
              allJobs["total"]=allJobs.total;
              allJobs=pagination.paginateResponse(allJobs,pageDetail);
      
      
            return{
                data:allJobs
            }

        }
        let page=user.query.page;//by user
        let limit=user.query.limit;//by user 
        let offset=(page)*limit;

        let pageDetail={
            limit:user.query.limit,
            page:page,
            offset:offset
        }
        let jobId=await userRepo.getIdByuuid(user.headerData.userid);//get id from uuid
        let extractedJobs=await applicationRepo.getAppliedJobs(jobId.id);
        let arr=[];//to get Applied jobs;
        for(let i=0;i<extractedJobs.length;i++){     
                  arr.push(extractedJobs[i].job_id); }//refactor

        let availableJobs=await jobRepo.getAvailableJobs(arr,pageDetail);
        availableJobs["total"]=availableJobs.total;
        availableJobs=pagination.paginateResponse(availableJobs,pageDetail);


        return {
             data:availableJobs            
        }

    },
        
    //Candidate comes to apply
    applyForJob:async(jobUuid,userUuid)=>{
        let jobId=await jobRepo.getJobDetailsByUuid(jobUuid);
        if(typeof(jobId.id)==="undefined"){
            return{
                error:"Job Doesn't Exist",
                validator:false, 
            }
        }
        let checkJobId=await jobRepo.idExists(jobId.id);//get id from object[0]
       
        if(checkJobId.length>0){//if exists            
            let userId=await userRepo.getIdByuuid(userUuid);
            //check if already applied..if applied return.
            let isApplicationExists=await applicationRepo.isApplicationExists(userId.id,jobId.id);//refactor
            if(isApplicationExists.length>0){
                return {
                    error:"Already Applied",
                    validator:false
                }
            }
            let generatedUuid=uuid();
            let addedApplication=await applicationRepo.addApplication(userId.id,jobId.id,generatedUuid);//refactor
            //transform data here Check ??????
            return{                
                data:checkJobId,
                validator:true
            }
        }  //If doesn't Exist
            return {
                    error:"Job Doesn't Exist",
                    validator:false,    
        }
    },


    postNewJob:async(recruiterId,jobData)=>{
        
        //DO VALIDATION ERROR HERE
        let savedPassedData={
            title:jobData.title,
            description:jobData.description,
            uuid:jobData.uuid
        }
        let recruiterID=await userRepo.getIdByuuid(recruiterId);
        jobData.recruiterid=recruiterID;
        //check if already data present.
        //but first validate the data...
        if(!(validator.validateJobData(jobData)).value){
            return{
                error:"title|description both are required",
                validator:false
            }
        }


        let isJobExists=await jobRepo.isJobExists(jobData);
        if(isJobExists.length>0){//job already posted
            return {
                error:"Job Already Posted",
                validator:false,
            }
        }
        jobData.uuid=uuid();
        savedPassedData["uuid"]=jobData.uuid;
        let jobPosted=await jobRepo.postJobData(jobData);
        return {
            data:savedPassedData,
            validator:true
        }
    },


    jobsApplied:async(candidateUuid,user)=>{
        
        let page=user.query.page;//by user
        let limit=user.query.limit;//by user 
        let offset=(page)*limit;

        let pageDetail={
            limit:user.query.limit,
            page:page,
            offset:offset
        }
        let candidateId = await userRepo.getIdByuuid(candidateUuid);
        let jobs = await candidateId.$relatedQuery("appliedjobs").page(parseInt(pageDetail.page),parseInt(pageDetail.limit));


        jobs["total"]=jobs.total;
        jobs=pagination.paginateResponse(jobs,pageDetail);
        c


        return {
            data:jobs,
            validator:true,
        }

    },

    jobDelete:async(jobData)=>{

        let job = await jobRepo.getJobDetailsByUuid(jobData.job_id);
        if(typeof(job)=="undefined"){
            return{
                validator:false,
                code:404,
                message:"Job data not found"
            }
        }
        let deletedApplications=await applicationRepo.deleteAppByJobId(job.id);
        let deletedJobs=await jobRepo.deleteJobByJobId(job.id);
        return{
            message:"Job deleted successfully",
            validator:true
        }

        
    }

    

    


}
    