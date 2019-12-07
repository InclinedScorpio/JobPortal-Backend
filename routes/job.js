const express=require("express");
const app=express();//parser already used in app.js as middleware.
const router=require("express").Router();
const authControl=require("../middlewares/checkAuth");
const responseProvider=require("../middlewares/ResponseProvider");
const {
    getAllJobs,//check and controller also CHECK
    applyToJob,
    postJob,
    appliedJobs
}=require("../controller/jobController");
const{
    isCandidate,
    isRecruiter,
    isAdmin
}=require("../middlewares/checkRole");
const{
    getCandidates
}=require("../controller/applicationController");

app.use(responseProvider);//check (Ask sequence of execution)


//remove jobs in which applied !
router.post("/new",authControl,isRecruiter,postJob)//only by RECRUITER
router.get("/:id/candidates",authControl,isRecruiter,getCandidates);//ONLY RECRUITER
router.get("/appliedJobs",authControl,isCandidate,appliedJobs);//ONLY CANDIDATES
router.post("/:id",authControl,isCandidate,applyToJob);//BY CANDIDATE ONLY
router.get("/",authControl,isCandidate,getAllJobs);//BY CANDIDATE ONLY





// router.post("/",authControl,isRecruiter,submitJob);
// router.delete("/jobs/:jobid",authControl,getParticularJob);


module.exports=router;




