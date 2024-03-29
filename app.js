const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const morgan=require("morgan")
const responseProvider=require("./middlewares/ResponseProvider");
const dotenv = require("dotenv");
const headers=require("./middlewares/headers");
const rateLimit = require("express-rate-limit");
const cors = require("cors")

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300 // limit each IP to 100 requests per windowMs
});
 
dotenv.config();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(responseProvider);
app.use(headers);
app.use(limiter);
app.use(cors());

const indexRoutes=require("./routes/index");
app.use(indexRoutes)

app.listen(process.env.PORT,()=>{
    console.log('Server Started : PORT ', process.env.PORT)
})