const BaseRepo=require("./BaseRepo");
const ApplicationRepo=require("./ApplicationRepo");
const Application=require("../models/Application");

//instance of application repo
applicationRepo=new ApplicationRepo(Application);

class JobRepo extends BaseRepo{
    constructor(Model){
        super(Model);
    }

//refactor
    async getAvailableJobs(appliedJobId){//got applied job id's
        console.log(appliedJobId);
        const check = [{"id": 1},{"id": 2}] 
        let availableJobs=await this.model.query()
        .whereNotIn("id",check) //don't show passed ID's(Already applied)
        .select("id","job_title","job_description");

        return availableJobs;
    }

    async getAppliedJobs(candidateId){ //ID is user id...

        let arr=[candidateId];
        //select those jobs from jobs in which user didn't applied(application)
        let jobFromApplication=await this.model.query()
        .where("user_id")

        let jobsFromApplication=await this.model.query()
        .leftJoin("applications","jobs.id","=","applications.job_id")
        .whereNotIn("applications.user_id",arr);
        // .orWhereNull("applications.user_id")
        // .orWhere("user_id",null);

        return jobsFromApplication;
    }

    async getAvailableJobs(appliedJobs){
        let availableJobs=await this.model.query()
        .whereNotIn("id",appliedJobs)
        .select("uuid","job_title","job_description");

        
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
        let jobId=await this.model.query()
        .where("uuid",jobUuid);
        
        return jobId;
    }
//??
    async postJobData(jobData){
        // console.log("%%%%%%%%%%%%%%",jobData);
        let jobInserted=await this.model.query()
        .insert({
            recruiter_id:jobData.recruiterid.id, //refactor
            job_title:jobData.title,
            job_description:jobData.description,
            uuid:jobData.uuid
        });
    }

    async isJobExists(jobData){
        // console.log("$$$$$$$$$$$",jobData.recruiterid.user_id);
        let getJob=await this.model.query()
        .where("recruiter_id",jobData.recruiterid.id)//changes done here check
        .where("job_title",jobData.title)
        .where("job_description",jobData.description);

        return getJob;
    }
}

module.exports=JobRepo;