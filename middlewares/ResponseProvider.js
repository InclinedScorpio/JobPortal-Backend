//providing function for getting own modified response...
 const resposeProvider=(req,res,next)=>{  //check
    res.success = (code=200, message="success", data) => {
        res.status(code).send({ 
            code,
            message,
            data
        });
    },
    res.error =(code=404,message="failed",errors)=>{
        res.status(code).send({//code message desc.
            code,
            message,
            errors
        });
    }
    next();

 } 

 module.exports= resposeProvider;
 
