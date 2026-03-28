const cloudinary = require('../utils/cloudinary')
const Image=require('../models/image')

exports.createImage=async(req,res)=>{
    try{
const {title,description,price}=req.body

if(!req.file){
    return res.status(400).json({message:'file is required'})
}
const result=await cloudinary.uploader.upload(req.file.path,{
    folder:"images",
    resource_type:"auto"
})

const newImage=await Image.create({
   title,
   description,
   price,
   image:result.secure_url 
})
// await result.save();
res.status(201).json(newImage)
}catch(err){
res.status(500).json({message:err.message})
}},

exports.getAllImage=async(req,res)=>{
try{
const image=await Image.find();
if(!image){
    return res.status(404).json({message:"image not found"});
}
return res.status(200).json(image)
}catch(err){
return res.status(500).json({message:err.message})
}
},

exports.deleteImage=async(req,res)=>{
try{
const image=await Image.findByIdAndDelete(req.params.id);
if(!image){
    return res.status(400).json({message:"Image not found"});
}
res.status(200).json({message:"product deleted successfully"})
}catch(err){
res.status(500).json({message:err.message})
}
},
exports.updateImage=async(req,res)=>{
try{
   const {title,description,price}=req.body 
    const newUpdate={
    title,
    description,
    price,
    }
    if(req.file){   //if user want  to update file
         const result=await cloudinary.uploader.upload(req.file.path,{
    folder:"images",
    resource_type:"auto"
   })
  
   newUpdate.image=result.secure_url
    }
  
   
   const image=await Image.findByIdAndUpdate(req.params.id,newUpdate,{new:true});
 res.status(200).json(image)
}catch(err){
res.status(500).json({message:err.message})
}
}
