const router=require("express").Router();
const authControl=require("../middlewares/checkAuth");
const {
    getAllJobs,//check and controller also CHECK
    applyToJob,
    postJob
}=require("../controller/jobController");
const{
    isCandidate,
    isRecruiter,
    isAdminOrCandidate,
    isAdmin
}=require("../middlewares/checkRole");
const{
    deleteJob
}=require("../controller/adminController");


const{
    getCandidates
}=require("../controller/applicationController");



router.get("/jobs",authControl,isAdminOrCandidate,getAllJobs);
router.get("/:job_id/applications",authControl,isRecruiter,getCandidates);
router.post("/:job_id",authControl,isCandidate,applyToJob);
router.get("/",authControl,isAdminOrCandidate,getAllJobs);
router.post("/",authControl,isRecruiter,postJob)
router.delete("/:job_id",authControl,isAdmin,deleteJob);




module.exports=router;





















//remove jobs in which applied !
// router.post("/new",authControl,isRecruiter,postJob)//only by RECRUITER
// router.get("/:id/candidates",authControl,isRecruiter,getCandidates);//ONLY RECRUITER
// router.get("/appliedjobs",authControl,isCandidate,appliedJobs);//ONLY CANDIDATES
// router.get("/:id",authControl,isCandidate,applyToJob);//BY CANDIDATE ONLY
// router.get("/",authControl,isCandidate,getAllJobs);//BY CANDIDATE ONLY
// router.get("/candidates",authControl,isAdmin,getAllCandidates);
// router.get("/recruiter",authControl,isAdmin,getAllRecruiters);

