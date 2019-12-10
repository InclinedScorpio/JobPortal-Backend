const Application =require("../models/Application");
const Job=require("../models/Job");
const User=require("../models/User");
const uuid=require("uuid/v1");

const JobRepo =require("../repo/JobRepo");
const UserRepo=require("../repo/UserRepo");
const ApplicationRepo=require("../repo/ApplicationRepo");
const validator=require("../validators/jobValidator");

jobRepo=new JobRepo(Job);
userRepo=new UserRepo(User);
applicationRepo=new ApplicationRepo(Application);

module.exports={
    getJobs:async(user)=>{
        console.log("$$$$$$$$$$$$$$$$GOT IT ");
        let jobId=await userRepo.getIdByuuid(user.headerData.userid);//get id from uuid
        console.log("&&&&&&&",jobId);
        let extractedJobs=await applicationRepo.getAppliedJobs(jobId.id);
        console.log("^#5#$$$$$",extractedJobs);
        let arr=[];//to get Applied jobs;
        for(let i=0;i<extractedJobs.length;i++){     
                  arr.push(extractedJobs[i].job_id); }//refactor

        // console.log(extractedJobs);
        let availableJobs=await jobRepo.getAvailableJobs(arr);
        return {
        
             data:availableJobs            
        }

    },
        
    //Candidate comes to apply
    applyForJob:async(jobUuid,userUuid)=>{
        console.log(">>>>>",jobUuid);
        let jobId=await jobRepo.getJobDetailsByUuid(jobUuid);
        console.log("<<<<<<<",jobId);
        if(typeof(jobId[0].id)==="undefined"){
            return{
                error:"Job Doesn't Exist",
                validator:false, 
            }
        }
        let checkJobId=await jobRepo.idExists(jobId[0].id);//get id from object[0]
       
        if(checkJobId.length>0){//if exists            
            let userId=await userRepo.getIdByuuid(userUuid);
            //check if already applied..if applied return.
            let isApplicationExists=await applicationRepo.isApplicationExists(userId.id,jobId[0].id);//refactor
            if(isApplicationExists.length>0){
                return {
                    error:"Already Applied",
                    validator:false
                }
            }
            let generatedUuid=uuid();
            let addedApplication=await applicationRepo.addApplication(userId.id,jobId[0].id,generatedUuid);//refactor
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
        let savedPassedData=jobData;
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
                data:savedPassedData //check if needed
            }
        }
        jobData.uuid=uuid();
        let jobPosted=await jobRepo.postJobData(jobData);
        return {
            data:savedPassedData,
            validator:true
        }
    },


    jobsApplied:async(candidateUuid)=>{
        
        let candidateId = await userRepo.getIdByuuid(candidateUuid);
        console.log("JOBB SEERVICEs",candidateId);
        let jobs = await candidateId.$relatedQuery("appliedjobs");
        console.log("%%%%",jobs);
        return {
            data:jobs,
            validator:true
        }

    }

    

    


}
    