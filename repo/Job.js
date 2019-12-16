const Base=require("./Base");
const ApplicationRepo=require("./Application");
const Application=require("../models/Application");

//instance of application repository
application=new ApplicationRepo(Application);

class Job extends Base{
    constructor(Model){
        super(Model);
    }

   

    async getAvailableJobs(appliedJobs,pageDetails){
        let availableJobs=await this.model.query()
        .whereNotIn("id",appliedJobs)
        .select("uuid","job_title","job_description")
        .page(pageDetails.page -1 ,pageDetails.limit);
     
        return availableJobs;
    }


   
    async getJobIdByUuid(jobUuid){
        let jobId=await this.model.query()
        .select("id")
        .where("uuid",jobUuid)
        .first();

        return jobId;
    }

    async isJobExists(jobData){
        return await this.model.query()
        .where("recruiter_id",jobData.recruiterid.id)//changes done here check
        .where("job_title",jobData.title)
        .where("job_description",jobData.description);
    }

    async getAllJobs(user){
        return await this.model.query()
        .select("job_title","job_description","uuid")
        .page(user.page - 1,user.limit);

    }

    async getJobsPosted(recruiterId,user){
        return await this.model.query()
        .select("job_title","job_description","uuid")
        .where("recruiter_id",recruiterId)
        .page(user.page-1,user.limit);
    }

}

module.exports=Job;