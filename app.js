const express=require('express');
const router=require('./src/route/api');
const app=new express();
const bodyParser=require('body-parser');
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const hpp=require('hpp');
const cors=require('cors');
const mongoose=require('mongoose');



//Security
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb'}));
app.use(bodyParser.json())


// Rate Limiting
const limiter=rateLimit({windowMs:15*60*1000,max:300});
app.use(limiter);


let url = "mongodb+srv://akash:akash123@cluster0.epuw6z9.mongodb.net/MERNECOM?retryWrites=true&w=majority"
// let options = {
//   user: "akash",
//   pass: "akash123",
// }
mongoose.connect(url).then(()=>{
  console.log("DB Connected");
}).catch((e)=>{
  console.log(e);
})



app.use("/api/v1",router);
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
});

module.exports=app;





