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

    getApplications:async(jobUuid)=>{
        //change uuid to ID
        let isUuidValid=validator.checkPassedUUID(jobUuid);
        if(isUuidValid.validator==false){
            return{
                error:"uuid can't be empty",
                validator:false,
            }
        }
        let job = await jobRepo.getJobIdByUuid(jobUuid);
        // console.log("######",job);
        let candidates=await job.$relatedQuery("candidates");
       
        return{
                data:candidates,
                validator:true
        }         
    },

    getAllApplications:async()=>{

        let jobApplications=await applicationRepo.getAllApplications();
        return{
            data:jobApplications,
            validator:true
        }
    }

   
}