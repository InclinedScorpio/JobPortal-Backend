
const express=require("express");
const router=express.Router();

 const{
   
    extractedRecruiters,
    deleteRecruiter
}=require("../controller/adminController");
const authControl=require("../middlewares/checkAuth");
const{
    isAdmin 
}=require("../middlewares/checkRole");

router.get("/",authControl,isAdmin,extractedRecruiters);
router.delete("/:recruiter_id",authControl,isAdmin,deleteRecruiter);



module.exports = router;