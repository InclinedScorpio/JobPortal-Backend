const BaseRepo=require("./BaseRepo");


class ApplicationRepo extends BaseRepo{
    constructor(Model){
        super(Model);
    }

    async getAppliedJobs(candidateId){ //ID is user id...
        // console.log("INSIDE RE{PPPPO",candidateId);
        //select those jobs from jobs in which user didn't applied(application)
        let jobFromApplication=await this.model.query()
        .where("user_id",candidateId)
        .select("job_id");

        return jobFromApplication;
    
}


    async addApplication(userId,jobId,uuid){
        let addedApplication=await this.model.query()
        .insert({
            user_id:userId,
            job_id:jobId,
            uuid:uuid
        });
        console.log("AAADEEEEEDDDD",addedApplication);
        return addedApplication;
    }

    async isApplicationExists(userId,jobId){
        let application=await this.model.query()
        .where("user_id",userId)
        .where("job_id",jobId);

        return application;
    }

    async getApplicants(jobId){
        let candidates=await this.model.query()
        .select("user_id")
        .where("job_id",jobId);

        return candidates;
    }

    async getAllApplications(){
        let applications=await this.model.query();

        return applications;
    }


  



}




module.exports=ApplicationRepo;