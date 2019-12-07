/**
 * Express , router, middlewares - (cors, response providers(), body parser,  )
 * controllers, services (validators, repos, transformers),  
 * .env (config(process.env)(dotenv)) 
 */ 
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const morgan=require("morgan")//for logging activities
const responseProvider=require("./middlewares/ResponseProvider");
const dotenv = require("dotenv");
dotenv.config()//for configuring dotenv file

app.use(morgan("dev"));
app.use(responseProvider);

// const adminRoutes=require("./routes/admin");
// const jobRoutes=require("./routes/job");
// const applicationRoutes=require("./routes/application");

const indexRoutes=require("./routes/index");
const candidate=require("./routes/candidate");
const recruiterRoutes=require("./routes/recruiter");
const jobRoute=require('./routes/job');


// app.use("/",candidate);
// // app.use("/admin",adminRoutes);
// app.use("/",recruiter);
// app.use("/job",jobRoutes);
// app.use("/application",applicationRoutes);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());//put body-parser middleware initially so that before forwarding the request it is present beforehand to us !!
app.use("/",indexRoutes);
app.use('/jobs',jobRoute);





// //handelling errors of 404
// app.use((req,res,next)=>{
//     const error=new Error("not found");
//     error.status(404);
//     next(error); // forward the error rather than req.
// });
// //handel all kinds of error
// app.use((error,req,res,next)=>{
//     res.status(error.status || 500).json({
//         error:{
//             message:error.message
//         }
//     });
// });


app.listen(process.env.PORT,()=>{
    console.log('the server started!', process.env.PORT)
})