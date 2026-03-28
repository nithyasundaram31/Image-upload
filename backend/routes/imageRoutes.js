const express=require("express");
const { createImage, getAllImage, deleteImage, updateImage } = require("../controllers/imageController");
const  upload = require("../utils/upload");
const imageRoutes=express.Router();
imageRoutes.post('/',upload.single('image'),createImage)
imageRoutes.get('/',getAllImage);
imageRoutes.put('/:id',upload.single('image'),updateImage)
imageRoutes.delete('/:id',deleteImage)
module.exports=imageRoutes