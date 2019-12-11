const Base=require("./Base");



class otp extends Base{
    constructor(Model){
        super(Model);
    }

    async checkUsernameAndOTP(username,otp){
        return await this.model.query().findOne({
            "email":username,
            "otp":parseInt(otp)
        });
    }


    async removeOTP(username,otp){
        return await this.model.query()
        .where("email",username)
        .where("otp",otp)
        .delete();
    }

}



module.exports=otp;