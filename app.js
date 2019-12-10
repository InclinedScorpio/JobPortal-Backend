const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const morgan=require("morgan")
const responseProvider=require("./middlewares/ResponseProvider");
const dotenv = require("dotenv");
dotenv.config()/

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(responseProvider);


const indexRoutes=require("./routes/index");
app.use(indexRoutes)


app.listen(process.env.PORT,()=>{
    console.log('the server started!', process.env.PORT)
})