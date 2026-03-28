// require("dotenv").config();
const {MONGODB_URI, PORT}=require('./utils/config.js') 
const app=require('./app')
const mongoose=require("mongoose");


mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("connected to the mongodb");
}
).catch((err)=>{
console.log(`error connected to the mongodb${err.message}`)
}
)
// const PORT=process.env.PORT||5003
app.listen(PORT,()=>{
    console.log(`server is running on http://127.0.0.1:${PORT}`)
})