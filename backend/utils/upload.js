const multer=require("multer");
const path=require("path");

const storage=multer.diskStorage({
  destination:function(req,file,cb){  //cb means call back function
      cb(null,'upload/')
    },
filename:function(req,file,cb){
 cb(null, Date.now()+ path.extname(file.originalname)) //ext means extension name(photo.png) like this
}
});

const upload=multer({storage})
module.exports=upload