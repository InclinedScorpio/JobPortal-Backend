const BaseRepo=require("./BaseRepo");
const ApplicationRepo=require("./ApplicationRepo");
const Application=require("../models/Application");

//instance of application repo
applicationRepo=new ApplicationRepo(Application);

class JobRepo extends BaseRepo{
    constructor(Model){
        super(Model);
    }


    async getAppliedJobs(candidateId){ //ID is user id...

        let arr=[candidateId];
        //select those jobs from jobs in which user didn't applied(application)
        let jobFromApplication=await this.model.query()
        .where("user_id")

        let jobsFromApplication=await this.model.query()
        .leftJoin("applications","jobs.id","=","applications.job_id")
        .whereNotIn("applications.user_id",arr);
        

        return jobsFromApplication;
    }

    async getAvailableJobs(appliedJobs,pageDetails){
        let availableJobs=await this.model.query()
        .whereNotIn("id",appliedJobs)
        .select("uuid","job_title","job_description").page(pageDetails.page ,pageDetails.limit);
        // .select("uuid","job_title","job_description").limit(parseInt(pageDetails.limit)).offset(parseInt(pageDetails.offset));

        // console.log("$$$$$$$$$$$$$",availableJobs);
        return availableJobs;
    }


    async idExists(id){
        let result=await this.model.query()
        .where("id",id)
        .select("uuid","job_title","job_description");

        return result;
    }
   
    async getJobIdByUuid(jobUuid){
        let jobId=await this.model.query()
        .select("id")
        .where("uuid",jobUuid)
        .first();

        return jobId;
    }

    async getJobDetailsByUuid(jobUuid){
        let jobId=await this.model.query().findOne({
            "uuid":jobUuid
        });
        return jobId;
    }

    async postJobData(jobData){
        let jobInserted=await this.model.query()
        .insert({
            recruiter_id:jobData.recruiterid.id, //refactor
            job_title:jobData.title,
            job_description:jobData.description,
            uuid:jobData.uuid
        });
    }

    async isJobExists(jobData){
        let getJob=await this.model.query()
        .where("recruiter_id",jobData.recruiterid.id)//changes done here check
        .where("job_title",jobData.title)
        .where("job_description",jobData.description);

        return getJob;
    }

    async getAllJobs(user){
        let allJobs=await this.model.query()
        .select("job_title","job_description","uuid")
        .page(user.page,user.limit);

        return allJobs;
    }


    async getJobByRecruiterId(recruiterId){
        let jobs=await this.model.query()
        .select("id")
        .where("recruiter_id",recruiterId);

        return jobs;
    }


    async deleteByRecruiterId(recruiterId){
        let count=await this.model.query()
        .delete()
        .where("recruiter_id",recruiterId);
           
        if(count==0){
            console.log("XXXX!!!XXXX::,no changes in deletebyrecruiterid");
        }
    }


    async deleteJobByJobId(jobId){
        let count= await this.model.query()
        .delete()
        .where("id",jobId);

        if(count==0){
            console.log("XXXX!!!XXXX::: no changes in record in deletejobbyjobid");
        }
    }
}

module.exports=JobRepo;