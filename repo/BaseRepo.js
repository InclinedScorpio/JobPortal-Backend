//no need to import as acc. to oops everything is passed//

class BaseRepo { 
    constructor(Model){
        this.model = Model;
    }


    async findOne(condition,username){
        const extractedusers = await this.model.query().findOne({
            [condition]: username
        });
        return extractedusers;
    }
    // Common function will go here
    async findByUsername(username){
       const extractedusers= await this.model.query()
       .where("username",username);

       return extractedusers; //return data or empty(array is created)
    }

    
    async checkAuthData(username,password){
        let extractedusers=await this.model.query()
        .where("username",username)
        .where("password",password);

        return extractedusers[0];
    }

    async getUserPassword(username){
        let extractedusers=await this.model.query()
        .where("username",username);

        return extractedusers.password;
    }

    async getNameById(userId){
        let name=await this.model.query()
        .where("id",userId);
        return name[0].name;
    }


    async getUsersByRole(role){
        let users=await this.model.query()
        .where("role",role)
        .select("uuid","name","username");

        return users;
    }

   

}

module.exports=BaseRepo;