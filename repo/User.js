const Base=require("./Base");

class User extends Base{
    constructor(Model){
        super(Model);
    }

     //changes done here.....
     async getIdByuuid(useruuid){
        return await this.model.query()
        .select("id")
        .where("uuid",useruuid)
        .first();
    }


    async appliedCandidates(candidates){
        return await this.model.query()
        .whereIn("id",candidates)
        .orderBy("created_at", 'desc');
        //no base beacuse id specified differently.
    }


    async mailExists(userData){
        return await this.model.query()
        .where("email",userData);
    }


    async updatePassword(hash,username){
        return await this.model.query()
        .patch({ "password": hash })
        .where("email",username);
    }

    async adminExists(){
        return await this.model.query()
        .first()
        .where("role",2);
    }

}

module.exports=User;