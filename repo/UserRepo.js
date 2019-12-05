const BaseRepo=require("./BaseRepo");

class UserRepo extends BaseRepo{
    constructor(Model){
        super(Model);
    }

    async create(data){
        console.log("inside repo",data);
        return await this.model.query().insert(data);
        
     }
     
}

module.exports=UserRepo;