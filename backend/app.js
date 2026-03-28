const express=require("express");
const imageRoutes = require("./routes/imageRoutes");
const cors=require("cors")
const app=express()

app.use(cors({
    origin:"https://loquacious-panda-20da0a.netlify.app",
    credentials:true
}))
app.use(express.json());
app.use('/api/upload',imageRoutes);   //this image name must handle samename in frontend

module.exports=app