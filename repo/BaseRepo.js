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
        let extractedusers=this.model.query()
        .where("username",username)
        .where("password",password);

        return extractedusers[0];
    }

    async getUserPassword(username){
        let extractedusers=this.model.query()
        .where("username",username);

        return extractedusers.password;
    }

    // async create(data){
    //     return await this.model.create(data);
    // }

    // async signup(username,password){ WILL COME IN CANDIDATE REPO
       
    //     const newUser=await this.model.query().insert({  //changes
    //         uuid:uuidnew,
    //         name:name,
    //         username:username,
    //         password:hashedpassword,
    //         role:role       
    //      }); 
    // }
}

module.exports=BaseRepo;