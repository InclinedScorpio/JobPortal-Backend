const router=require("express").Router();
const authControl=require("../middlewares/checkAuth");
const {
    getAllJobs,//check and controller also CHECK
    applyToJob,
    postJob
}=require("../controller/job");
const{
    isCandidate,
    isRecruiter,
    isAdminOrCandidate,
    isAdmin
}=require("../middlewares/checkRole");
const{
    deleteJob
}=require("../controller/admin");


const{
    getCandidates
}=require("../controller/application");



router.get("/jobs",authControl,isAdminOrCandidate,getAllJobs);//done
router.get("/:job_id/applications",authControl,isRecruiter,getCandidates);//done
router.post("/:job_id",authControl,isCandidate,applyToJob);//done
router.get("/",authControl,isAdminOrCandidate,getAllJobs);//done
router.post("/",authControl,isRecruiter,postJob)//done
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

