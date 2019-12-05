// module.exports={
    //just make functions and pass it using {} use validator
// }
let Validator=require("validatorjs");
let errorarray=[];

const newAccount = (signupdata) => {
    let rules={
        name: 'required|min:3|regex:/^[a-zA-Z ]+$/',
        username: 'required|email',
        role: ['required', { 'in': [0, 1,2] }],//check!!
        password:'required|min:1',//password of min length 1    
    };
    let validation=new Validator(signupdata,rules);
    if(validation.passes()){
        return {
            value:true,
            message:"validated successfully"
        };
    }
    arr=validation.errors.get('name');
    if(arr&&arr.length){
        errorarray.push(validation.errors.get('name'));
    }
    arr=[];
    arr=validation.errors.get('username');
    if(arr&&arr.length){
        errorarray.push(validation.errors.get('username'));
    }
    arr=[];
    arr=validation.errors.get('role');
    if(arr&&arr.length){
        errorarray.push(validation.errors.get('role'));
    }
    arr=[];
    arr=validation.errors.get('password');
    if(arr&&arr.length){
        errorarray.push(validation.errors.get('password'));
    }
    arr=[];
    return {
        value:false,
        message:errorarray[errorarray-1],
        token:null
    };
}

module.exports={
    newAccount
}
  