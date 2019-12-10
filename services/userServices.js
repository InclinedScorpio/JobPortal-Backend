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
    }
}