import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

function ImageUpload(){
const [title,setTitle]=useState('');
const [description,setDescription]=useState('')
const [price,setPrice]=useState("")
const[photo,setPhoto]=useState(null);
const[loading,setLoading]=useState(true);
const[images,setImages]=useState([]);
const[edit,setEdit]=useState(null)


  const handleUpload=async(e)=>{
e.preventDefault()
try{

   const formData=new FormData();
formData.append("title",title);
formData.append("description",description);
formData.append("price",Number(price));
// if(photo){
  formData.append("image",photo); //this "image" should have matched in baclend . upload.single("image")
// }                               
console.log(formData)
  if(edit){
const response=await axios.put(`http://127.0.0.1:5003/api/upload/${edit}`,formData);
console.log("product update response is:",response.data)
 toast.success("product  updated successfully")
  }else{
    const response=await axios.post("http://127.0.0.1:5003/api/upload",formData)
console.log("create image response is:",response.data)
 toast.success("product created successfully")
  }
 setTitle("");
 setDescription('');
 setPrice("");
 setPhoto(null);
setLoading(false);

 handleProducts();
}catch(err){
  
  console.log("error message:", err.message);
 toast.error(edit?"product updated failed":"product created failed")

}
  }

    const handleProducts=async()=>{
try{
  const response=await axios.get('http://127.0.0.1:5003/api/upload');
  setImages(response.data);
 
  setLoading(false);
  
  console.log("all products:",response?.data)
}catch(err){
  console.log("all products:",err?.response?.data)
}
    }
      useEffect(()=>{
handleProducts();
  },[])

//  if(loading){
//   return<div className="p-4 text-base">Loading...</div>
//  }

const handleUpdate=(id)=>{

   const update=images.find((i)=>i._id==id)  
   if(update){
setTitle(update?.title);
setDescription(update?.description);
setPrice(update?.price);
setEdit(update?._id);
setPhoto(null)  //in image browser cannot pre-file so we just set null to old image 
   }

}

const handleDelete=async(id)=>{
  try{
const response= await axios.delete(`http://127.0.0.1:5003/api/upload/${id}`);
console.log("product delete response is:",response.data)
handleProducts();
  }catch(err){
console.log("product delete  error response is:",err.message)
  }
}
    return(<>
    <div className="text-xl text-green-700 bg-gray-200" >welcom image</div>
    <div className=" w-[80%] md:w-[95%] mx-auto p-2">
    
    <div className=" w-full md:w-[50%] border mx-auto mt-8 mb-6">
    <form  onSubmit={handleUpload} className="flex flex-col gap-4 p-4">
    <input type='text'  value={title} onChange={(e)=>setTitle(e.target.value)} className="border p-2" placeholder="title"/>
      <input type='text'  value={description}   onChange={(e)=>setDescription(e.target.value)} className="border p-2" placeholder="description"/>
        <input type='number'  value={price}  onChange={(e)=>setPrice(e.target.value)} className="border p-2" placeholder="price" />
          <input type='file' onChange={(e)=>setPhoto(e.target.files[0])}  className="border p-2" placeholder="image"/>
          <button type='submit' className="bg-green-500 text-white text-md p-2 transform transition active:scale-90"> {edit ? "Update" : "Create"}</button>
    </form>
  
    </div>
    {loading?(<div>loading..</div>)
    :
    images.length===0?(
      <div>Prioduct not found</div>
    ):(
      <>
       <div className="text-2xl font-bold">Products</div>
    <div className="bg-blue-100  p-4">
       <div className=" grid grid-cols-1 md:grid-cols-4 gap-8 ">
    { images.map((image)=>(
    <div key={image?._id} className="bg-white shadow-md overflow-hidden rounded">
       <img src={image?.image} className="w-full h-48 object-cover object-top "/>
       <div className="p-2">
         <div>Title:{image?.title}</div>
  <div>Description:{image?.description}</div>
  <div>Price:{image?.price}</div>
  <div className="flex flex-end justify-end gap-2">
    <button onClick={()=>handleUpdate(image?._id)} className="text-xs bg-blue-400 rounded-full px-1 py-0.5 border border-blue-500 transform transition active:scale-90">update</button>
    <button onClick={()=>handleDelete(image?._id)} className="text-xs bg-red-400 rounded-full px-1 py-0.5 border border-red-500 transform transition active:scale-90">Delete</button>
  
    </div> 
       </div>
 
        </div>
  
    ))}   
    </div> 
     </div>
      </>
    )}
    </div>
    </>)}
export default ImageUpload