const Application =require("../models/Application");
const Job=require("../models/Job");
const User=require("../models/User");
const uuid=require("uuid/v1");

const JobRepo =require("../repo/Job");
const UserRepo=require("../repo/User");
const ApplicationRepo=require("../repo/Application");
const validator=require("../validators/jobValidator");
const pagination=require("../transformers/pagination");

const jobTransformer=require("../transformers/jobTransformer");

jobRepo=new JobRepo(Job);
userRepo=new UserRepo(User);
applicationRepo=new ApplicationRepo(Application);

const { transformAll } = require('./../transformers/jobTransformer')

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
                console.log("^^^^^^^^^^^^^^",pageDetail);

              let allJobs=await jobRepo.getAllJobs(pageDetail);
              let trasformedData=jobTransformer.jobData(allJobs.results);
              trasformedData["total"]=allJobs.total;
              allJobs=pagination.paginateResponse(trasformedData,pageDetail);
      
            return{
                data:allJobs.data,
                metadata:allJobs.metadata
            }

        }
        //if candidate
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
                  arr.push(extractedJobs[i].job_id); }
                  
        let availableJobs=await jobRepo.getAvailableJobs(arr,pageDetail);
        let transformedData=jobTransformer.jobData(availableJobs.results);
        transformedData["total"]=availableJobs.total;
        allJobs=pagination.paginateResponse(transformedData,pageDetail);

        return {
            data:allJobs.data,
            metadata:allJobs.metadata        
        }

    },
        
    //Candidate comes to apply
    applyForJob:async(jobUuid,userUuid)=>{
        let jobId=await jobRepo.findOne("uuid", jobUuid );
        if(typeof(jobId)==="undefined"){
            return{
                error:"Job Doesn't Exist",
                validator:false, 
            }
        }
        let checkJobId=await jobRepo.findAndSelect("id",jobId.id,["uuid","job_title","job_description"],0);//get id from object[0]
       
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
            
            let addedApplication=await applicationRepo.create({user_id: userId.id, job_id: jobId.id,uuid: generatedUuid});//refactor
            console.log("JJOBB IDDD::::",checkJobId);
            let checkJob= jobTransformer.jobDataObject(checkJobId);
            //transform data here Check ??????
            return{                
                data:checkJob,
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
            uuid:jobData.uuid,
            companyname:jobData.companyname
        }
        if(savedPassedData.description.length>1500){
            return{
                error:"description can't be more than 1500 words",
                validator:false
            }
        }
        if(savedPassedData.title.length>100){
            return{
                error:"title can't be more than 100 words",
                validator:false
            }
        }
        if(savedPassedData.companyname==null || savedPassedData==undefined){
            return{
                error:"company name is required to proceed",
                validator:false
            }
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
        savedPassedData["id"]=jobData.uuid;
        let jobPosted=await jobRepo.create({
            recruiter_id:jobData.recruiterid.id, //refactor
            job_title:jobData.title,
            job_description:jobData.description,
            uuid:jobData.uuid,
            companyname:jobData.companyname
        });
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
        let jobs = await candidateId.$relatedQuery("appliedjobs").page(parseInt(pageDetail.page - 1),parseInt(pageDetail.limit));

        let transformedData=jobTransformer.jobData(jobs.results);
        transformedData["total"]=jobs.total;
        jobs=pagination.paginateResponse(transformedData,pageDetail);


        return {
            data:jobs.data,
            metadata:jobs.metadata,
            validator:true,
        }

    },

    jobDelete:async(jobData)=>{

        let job = await jobRepo.findOne('uuid' ,jobData.job_id );
        if(typeof(job)=="undefined"){
            return{
                validator:false,
                code:404,
                message:"Job data not found"
            }
        }
        let deletedApplications=await applicationRepo.deleteAppByJobId(job.id);
        let deletedJobs=await jobRepo.delete("id",job.id);
        return{
            message:"Job deleted successfully",
            validator:true
        }
    },



    jobsPosted:async(recruiterUuid,user)=>{
        let page=user.query.page;//by user
                let limit=user.query.limit;//by user 
                let offset=(page)*limit;

                let pageDetail={
                    limit:parseInt(user.query.limit),
                    page:parseInt(page),
                    offset:parseInt(offset)
                }
                // console.log("XXXXXXXX::GOT IN SERVICE");
        let recruiterId=await userRepo.getIdByuuid(recruiterUuid);
        let extractedPostedJobs=await jobRepo.getJobsPosted(recruiterId.id,pageDetail);        
        let transformedData= jobTransformer.jobData(extractedPostedJobs.results);
        transformedData["total"]=extractedPostedJobs.total;
        jobs=pagination.paginateResponse(transformedData,pageDetail);

        return{
            validator:true,
            data:jobs.data,
            metadata:jobs.metadata
        }

        
    }

} 