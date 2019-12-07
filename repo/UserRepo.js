const BaseRepo=require("./BaseRepo");

class UserRepo extends BaseRepo{
    constructor(Model){
        super(Model);
    }

    async create(data){
        console.log("inside repo",data);
        return await this.model.query().insert(data);
     }

     async getIdByuuid(useruuid){
        let extractedUser=await this.model.query()
        .select("user_id")
        .where("uuid",useruuid)
        .first();

        return extractedUser;
    }


    async appliedCandidates(candidates){
        let candidateDetails=await this.model.query()
        .whereIn("user_id",candidates); //no base beacuse id specified differently.

        return candidateDetails;
    }
     
}

module.exports=UserRepo;