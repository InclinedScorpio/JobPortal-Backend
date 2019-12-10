const express=require("express");
const router=express.Router();

// app.use(responseProvider);
const authControl=require("../middlewares/checkAuth");
const{
    isCandidate 
}=require("../middlewares/checkRole");
const{
    appliedJobs
}=require("../controller/jobController");



router.get("/",authControl,isCandidate,appliedJobs);//ONLY CANDIDATES

module.exports=router;