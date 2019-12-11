const router=require("express").Router();
const authControl=require("../middlewares/checkAuth");
const{
  isAdmin,
}=require("../middlewares/checkRole");

const{
    extractedCandidates,
    deleteCandidate
}=require("../controller/admin");


router.get("/",authControl,isAdmin,extractedCandidates);
router.delete("/:candidate_id",authControl,isAdmin,deleteCandidate); 




module.exports=router;

