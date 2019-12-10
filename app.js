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
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());//put body-parser middleware initially so that before forwarding the request it is present beforehand to us !!
app.use(responseProvider);




const indexRoutes=require("./routes/index");
app.use(indexRoutes)


app.listen(process.env.PORT,()=>{
    console.log('the server started!', process.env.PORT)
})