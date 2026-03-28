const mongoose=require("mongoose");
const imageSchema=new mongoose.Schema({
title:{
    type:String
},
description:{
    type:String
},
price:{
    type:Number
},
image:{
    type:String
}


},{timestamps:true})


module.exports=mongoose.model("Image",imageSchema)