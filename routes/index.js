const router=require("express").Router();
const jobRoutes = require('./job');
const candidateRoutes = require('./candidate');
const recruiterRoutes = require('./recruiter');
const applicationRoutes = require('./recruiter');
const authRoutes=require("./auth");


router.use('/jobs', jobRoutes);

router.use('/candidates', candidateRoutes);

router.use('/recruiters', recruiterRoutes);

router.use('/applications', applicationRoutes);

router.use("/",authRoutes);





module.exports=router;



 

