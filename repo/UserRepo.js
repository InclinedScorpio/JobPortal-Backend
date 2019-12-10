const BaseRepo=require("./BaseRepo");

class UserRepo extends BaseRepo{
    constructor(Model){
        super(Model);
    }

    async create(data){
        return await this.model.query().insert(data);
     }

     //changes done here.....
     async getIdByuuid(useruuid){
        let extractedUser=await this.model.query()
        .select("id")
        .where("uuid",useruuid)
        .first();

        return extractedUser;
    }


    async appliedCandidates(candidates){
        let candidateDetails=await this.model.query()
        .whereIn("id",candidates); //no base beacuse id specified differently.

        return candidateDetails;
    }


    async mailExists(userData){
        let user=await this.model.query()
        .where("username",userData);

        return user;
    }


    async updatePassword(hash,username){
        let user=await this.model.query()
        .patch({ "password": hash })
        .where("username",username);


        return user;

    }

   

}

module.exports=UserRepo;