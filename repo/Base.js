//no need to import as acc. to oops everything is passed//

class Base { 
    constructor(Model){
        this.model = Model;
    }

    async create(data){
        return await this.model.query().insert(data);
     }

    async findOne(condition, value){
        
        const extractedusers = await this.model.query().findOne({
            [condition]: value
        });
        return extractedusers;
    }

    async findAndSelect(field,value,attributes,pageDetail){
        if(pageDetail==0){
            let users=await this.model.query()
            .where(field,value)
            .select(attributes);
            return users;
        }

        let users=await this.model.query()
        .where(field,value)
        .select(attributes)
        .page(pageDetail.page - 1,pageDetail.limit);

        return users;
    }




    
    async checkAuthData(username,password){
        let extractedusers=await this.model.query()
        .where("email",username)
        .where("password",password);

        return extractedusers[0];
    }//not to be merged to common

    async getUserPassword(username){
        let extractedusers=await this.model.query()
        .where("email",username);

        return extractedusers.password;
    }//not to be merged

    async getNameById(userId){
        let name=await this.model.query()
        .where("id",userId);
    
        return name[0].name;
    }//nont to be merged



    async delete(field,fieldValue){
        let count=await this.model.query()
        .delete()
        .where(field,fieldValue);

        if(count==0){
            console.log("XXXX!!!XXXX::,no changes found in deleteByField->Base");
        }

    }



   

}

module.exports=Base;