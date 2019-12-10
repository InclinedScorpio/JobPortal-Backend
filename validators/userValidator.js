// module.exports={
    //just make functions and pass it using {} use validator
// }
var validator = require('validator');
var validatorjs=require("validatorjs");
// const {
//     User,
//     Job,
//     Application
// } = require('../models');

module.exports = {
    newAccount: (user) => {

        const errors = [];
        //validate the user here
        if (user.username === undefined) {
            errors.push({
                "code": 422,
                "field": "email",
                "message": "Username is required."
            });
        } else if (validator.isEmpty(user.username)) {
            errors.push({
                "code": 422,
                "field": "email",
                "message": "Username should not be empty."
            });
        } else if (!validator.isEmail(user.username)) {
            errors.push({
                "code": 422,
                "field": "username",
                "message": "Username is not valid."
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
        } else if (user.password.length < 4) {
            errors.push({
                "code": 422,
                "field": "password",
                "message": "Minimum 4 character password required."
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
        if (user.role > 2) {
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
        if(user.username===undefined){
            errors.push({
               "code":401,
               "field":"username",
               "message":"username is required" 
            }); 
        }

        else if(validator.isEmpty(user.username)){
            errors.push({
                "code":401,
                "field":"username",
                "message":"username can't be empty"
            });
        }
        
        else if(!validator.isEmail(user.username)){
            errors.push({
                "code":401,
                "field":"username",
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
        let data={
            username:user
        }
        let rule={
            username:"required|email"
        }
        let validation = new validatorjs(data, rule);
        if(validation.passes()){
            return{
                value:true
            }
        }
        return{
            value:false
        }

    },


    checkResetData:(resetData)=>{
        
        data={
            username:resetData.username,
            otp:parseInt(resetData.otp),
            password:resetData.password
        }
        console.log("^^^^^^^^^^^^",data);
        rule={
            username:"required|email",
            otp:"required|min:1",
            password:"required"
        }
        let validation = new validatorjs(data, rule);
        console.log("TRUE----",validation.passes());
        // console.log(validation.errors.first('username'));
        if(validation.passes()){
            return{
                validator:true
            }
        }
        return{
            validator:false
        }
    

    }


}




