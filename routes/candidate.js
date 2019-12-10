const router=require("express").Router();
const authControl=require("../middlewares/checkAuth");
const{
  isAdmin,
}=require("../middlewares/checkRole");

const{
    extractedCandidates,
}=require("../controller/adminController");


//COMPLETE??CHECK
router.get("/",authControl,isAdmin,extractedCandidates);
// router.get("/:candidate_id/jobs",authControl,isAdmin,getJobsByCandidate);  




module.exports=router;

