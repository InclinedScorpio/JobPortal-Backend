const validator=require("validatorjs");


module.exports={
    
    validateJobData:(jobData)=>{
        const rule={
            title:"required|min:1",
            description:"required|min:1"
        }
        let validation=new validator(jobData,rule);
        if(validation.passes()){
            return{
                value:true
            }
        }
        return{
            value:false
        }
    }
}