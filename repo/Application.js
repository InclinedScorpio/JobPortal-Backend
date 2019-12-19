const Base=require("./Base");


class Application extends Base{
    constructor(Model){
        super(Model);
    }

    async getAppliedJobs(candidateId){ 
        let jobFromApplication=await this.model.query()
        .orderBy("created_at", 'desc')
        .where("user_id",candidateId)
        .select("job_id");

        return jobFromApplication;
    
}


   
    async isApplicationExists(userId,jobId){
        let application=await this.model.query()
        .where("user_id",userId)
        .where("job_id",jobId);

        return application;
    }

    async getApplicants(jobId){
        let candidates=await this.model.query()
        .orderBy("created_at", 'desc')
        .select("user_id")
        .where("job_id",jobId);

        return candidates;
    }

    async getAllApplications(pageDetails){
        let applications=await this.model.query()
        .orderBy("created_at", 'desc')
        .page(pageDetails.page -1 ,pageDetails.limit);

        return applications;
    }

    async deleteByUserId(id){
        let count=await this.model.query()
        .where("user_id",id)
        .delete();

        if(count==0){
            console.log("XXXXX!!XXXX :: Query not running in deletebyuserid")
        }

    }

    async deleteGivenJobs(jobs){
        // console.log(jobs);
        let count =await this.model.query()
        .delete()
        .whereIn("job_id",jobs);
        
        if(count==0){
            console.log("XXX!!XXX:: Got 0 unchanged at deletegivenjobs");
        }
    }


  async deleteAppByJobId(jobId){
      let count=await this.model.query()
      .delete()
      .where("job_id",jobId);

      if(count==0)
      {
          console.log("XXX!!XXX:: records unchanged in deleteappbyjobid");
      }
  }



}




module.exports=Application;