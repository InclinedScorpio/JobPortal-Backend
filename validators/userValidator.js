
var validator = require('validator');


module.exports = {
    newAccount: (user) => {

        const errors = [];
        //validate the user here
        if (user.email === undefined) {
            errors.push({
                "code": 422,
                "field": "email",
                "message": "Email is required."
            });
        } else if (validator.isEmpty(user.email)) {
            errors.push({
                "code": 422,
                "field": "email",
                "message": "Email can't not be empty."
            });
        } else if (!validator.isEmail(user.email)) {
            errors.push({
                "code": 422,
                "field": "email",
                "message": "Email is not valid."
            });
        }

        if (user.name === undefined) {
            errors.push({
                "code": 422,
                "field": "name",
                "message": "Name is required."
            });
        } else if (validator.isEmpty(user.name)) {
            errors.push({
                "code": 422,
                "field": "name",
                "message": "Name should not be empty."
            });
        }

        if (user.password === undefined) {
            errors.push({
                "code": 422,
                "field": "password",
                "message": "Password is required."
            });
        } else if (validator.isEmpty(user.password)) {
            errors.push({
                "code": 422,
                "field": "password",
                "message": "Password should not be empty."
            });
        } else if (user.password.length < 6) {
            errors.push({
                "code": 422,
                "field": "password",
                "message": "Minimum 6 character password required."
            });
        }

        if (user.role === undefined) {
            errors.push({
                "code": 422,
                "field": "role",
                "message": "Role is required."
            });
        } else if (validator.isEmpty(user.role)) {
            errors.push({
                "code": 422,
                "field": "role",
                "message": "Role should not be empty."
            })
        } else if (!validator.isNumeric(user.role)) {
            errors.push({
                "code": 422,
                "field": "role",
                "message": "Role can only be numeric."
            })
        }
        if (user.role > 2 ) {
            errors.push({
                "code": 422,
                "field": "role",
                "message": "Not a valid user role."
            });
        }
        if (user.role < 0 ) {
            errors.push({
                "code": 422,
                "field": "role",
                "message": "Not a valid user role."
            });
        }
        //send the resonse back..

        if (errors.length > 0) {
            return {
                value: false,
                result: errors,
                token:null
            }
        } else {
            return {
                value: true,
            }
        }
    },
//SIGNIN VALIDATION----------------------------------------------------------

    signupValidate:(user)=>{
        let errors=[];
        if(user.email===undefined){
            errors.push({
               "code":401,
               "field":"email",
               "message":"email is required" 
            }); 
        }

        else if(validator.isEmpty(user.email)){
            errors.push({
                "code":401,
                "field":"email",
                "message":"email can't be empty"
            });
        }
        
        else if(!validator.isEmail(user.email)){
            errors.push({
                "code":401,
                "field":"email",
                "message":"recheck your email"
            });
        }

        if(user.password===undefined){
            errors.push({
                "code":401,
                "field":"password",
                "message":"password is required | undefined"
            });
        }
        else if(validator.isEmpty(user.password)){
            errors.push({
                "code":401,
                "field":"password",
                "message":"password is required | can't be empty"
            });
        }
       if(errors.length>0){
           return{
               value:false,
               error:errors
           }
       }else{
           return{
               value:true
           }
       }
    },

    validateUser:(user)=>{
            let errors=[];

        if (validator.isEmpty(user)) {
            errors.push({
                "code": 422,
                "field": "email",
                "message": "email can't be empty."
            });
        } else if (!validator.isEmail(user)) {
            errors.push({
                "code": 422,
                "field": "email",
                "message": "email is not valid."
            });
        }

        if(errors.length>0){
            return{
                value:false,
                error:errors
            }
        }else{
            return {
                value:true,
            }
        }


    },


    checkResetData:(resetData)=>{
       
console.log("$$$$$$$$$$$$$$$$",resetData);
        const errors = [];

        if (validator.isEmpty(resetData.email)) {
            errors.push({
                "code": 422,
                "field": "email",
                "message": "email can't be empty."
            });
        } else if (!validator.isEmail(resetData.email)) {
            errors.push({
                "code": 422,
                "field": "email",
                "message": "email is not valid."
            });
        } if (validator.isEmpty(resetData.password)) {
            errors.push({
                "code": 422,
                "field": "password",
                "message": "password can't not be empty."
            });
        }else if (resetData.password.length<6) {
            errors.push({
                "code": 422,
                "field": "password",
                "message": "password should be minimum 6 character long."
            });
        }
        
        if (validator.isEmpty(resetData.otp)) {
            errors.push({
                "code": 422,
                "field": "otp",
                "message": "otp can't be empty"
            });
        }
        else if(!validator.isNumeric(resetData.otp)){
            errors.push({
                "code":422,
                "field":"otp",
                "message":"otp should only be digits."
            })
        }
        if(errors.length>0){
            return{
                validator:false,
                error:errors
            }
        }else{
            return {
                validator:true,
            }
        }

    }


}




