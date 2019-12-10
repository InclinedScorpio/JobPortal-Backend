
const express=require("express");
const router=express.Router();
const { 
    signup,
    signin
 }=require("../controller/authController"); 
 const responseProvider=require("../middlewares/ResponseProvider");
 const{
    extractedApplications,
    extractedCandidates,
    extractedRecruiters
}=require("../controller/adminController");
// app.use(responseProvider);
const authControl=require("../middlewares/checkAuth");
const{
    isAdmin 
}=require("../middlewares/checkRole");

//check ???complete
// router.get("/",authControl,isAdmin,extractedRecruiters);
// router.get("/:recruiter_id/jobs",authControl,isAdmin,getJobsByRecruiter)


module.exports = router;