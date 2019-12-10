const express=require("express");
const router=express.Router();
const { 
    signup,
    signin,
    forgetPassword,
    resetPassword
 }=require("../controller/authController"); 

router.post("/signup", signup);
router.post("/signin",signin);
router.post("/forgetpassword",forgetPassword);
router.post("/resetpassword",resetPassword);


router.all("/:id",(req,res,next)=>{
    res.send({
        code:404,
        error:"Page not defined",
        message:"looks like you have lost your way"
    })
});

module.exports=router;
