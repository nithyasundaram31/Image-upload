const express=require("express");
const imageRoutes = require("./routes/imageRoutes");
const cors=require("cors")
const app=express()

app.use(cors({
    origin:" http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use('/api/upload',imageRoutes);   //this image name must handle samename in frontend

module.exports=app