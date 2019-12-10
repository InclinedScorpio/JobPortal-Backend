const validator=require("validatorjs");


module.exports={

    checkPassedUUID:(uuid)=>{
        rule={
            Uuid: 'required',      
        }
        temp={
            Uuid:uuid
        }
        let validation = new validator(temp, rule);
        if(validation.passes()){
            return {
                validator:true
            }
        }
        return{
            error:"uuid is not provided",
            validator:false
        }
    

    }
}