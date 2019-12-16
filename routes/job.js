const router=require("express").Router();
const authControl=require("../middlewares/checkAuth");
const {
    getAllJobs,//check and controller also CHECK
    applyToJob,
    postJob,
    jobsByRecruiter
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


router.get("/posted",authControl,isRecruiter,jobsByRecruiter);//changes
router.get("/jobs",authControl,isAdminOrCandidate,getAllJobs);//done
router.get("/posted/:job_id",authControl,isRecruiter,getCandidates);//changes
router.post("/:job_id",authControl,isCandidate,applyToJob);//done
router.get("/",authControl,isAdminOrCandidate,getAllJobs);//done
router.post("/",authControl,isRecruiter,postJob)//done
router.delete("/:job_id",authControl,isAdmin,deleteJob);




module.exports=router;
