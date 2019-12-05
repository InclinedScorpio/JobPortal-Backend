const express=require("express");
const router=express.Router();
const { signup }=require("../controller/authController"); 


// router.get("/",(req,res)=>{
//     res.send("asd");
// });
router.post("/signup", signup);

// router.post("/signup",indexController.post_signup_page);

// router.get("/signin",indexController.get_signin_page);

// router.post("/signin",indexController.post_signin_page);

module.exports=router;