const BaseRepo=require("./BaseRepo");



class otpRepo extends BaseRepo{
    constructor(Model){
        super(Model);
    }

    async saveOTP(otp,userName){
        let save=await this.model.query()
        .insert({
            email:userName,
            otp:otp
        });
        return save;     
    }



    async checkUsernameAndOTP(username,otp){
        let record=await this.model.query().findOne({
            "email":username,
            "otp":parseInt(otp)
        });
        return record;

    }


    async removeAllOTP(username,otp){
       let changes= await this.model.query()
        .where("email",username)
        .delete();

        return changes;
    }
}



module.exports=otpRepo;