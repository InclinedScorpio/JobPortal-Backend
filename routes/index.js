const router=require("express").Router();
const jobRoutes = require('./job');
const candidateRoutes = require('./candidate');
const recruiterRoutes = require('./recruiter');
const applicationRoutes = require('./application');
const authRoutes=require("./auth");

const version = 'v1'

router.use(`/api/${version}/jobs`, jobRoutes);

router.use(`/api/${version}/candidates`, candidateRoutes);

router.use(`/api/${version}/recruiters`, recruiterRoutes);

router.use(`/api/${version}/applications`, applicationRoutes);

router.use(`/api/${version}/`,authRoutes);





module.exports=router;



 

