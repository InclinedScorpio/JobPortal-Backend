const Application =require("../models/Application");
const Job=require("../models/Job");
const User=require("../models/User");
const uuid=require("uuid/v1");

const JobRepo =require("../repo/Job");
const UserRepo=require("../repo/User");
const ApplicationRepo=require("../repo/Application");
const transformer=require("../transformers/userTransformer");
const pagination=require("../transformers/pagination");

const validator=require("../validators/candidateValidator");

jobRepo=new JobRepo(Job);
userRepo=new UserRepo(User);
applicationRepo=new ApplicationRepo(Application);

module.exports={

    getApplications:async(jobUuid,user)=>{

        let page=parseInt(user.query.page) ;//by user
                let limit=parseInt(user.query.limit);//by user 
                let offset=(page)*limit;

                let pageDetail={
                    limit:parseInt(user.query.limit),
                    page:parseInt(page),
                    offset:parseInt(offset)
                }

        //change uuid to ID
        let isUuidValid=validator.checkPassedUUID(jobUuid);
        if(isUuidValid.validator==false){
            return{
                error:"id can't be empty",
                validator:false,
            }
        }
        let job = await jobRepo.getJobIdByUuid(jobUuid);
        let candidates=await job.$relatedQuery("candidates").page(pageDetail.page - 1,pageDetail,limit);
        candidates["total"]=candidates.total;
        candidates=pagination.paginateResponse(candidates,pageDetail);

        return{
                data:candidates,
                validator:true
        }         
    },

    getAllApplications:async()=>{

        let page=user.query.page;//by user
        let limit=user.query.limit;//by user 
        let offset=(page)*limit;

        let pageDetail={
            limit:parseInt(user.query.limit),
            page:parseInt(page),
            offset:parseInt(offset)
        }


        let jobApplications=await applicationRepo.getAllApplications(pageDetail);


        jobApplications["total"]=jobApplications.total;
        jobApplications=pagination.paginateResponse(jobApplications,pageDetail);

        
        return{
            data:jobApplications,
            validator:true
        }
    }

   
}