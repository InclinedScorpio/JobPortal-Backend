//providing function for getting own modified response...
 const resposeProvider=(req,res,next)=>{  //check
    res.success = (data, status, msg) => {
        res.status(status).json({ 
            message: msg, 
            data: data,
            status: status
        });
    },
    res.error =(data,status,msg)=>{
        res.status(status).json({//code message desc.
            message: msg,
            data: data,
            status: status
        });
    }
    next();

 } 

 module.exports= resposeProvider;
 
