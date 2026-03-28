##  Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/mydb
PORT=5003
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
## Multer with Cloudiary
###  Multer
Multer is a middleware used in Node.js to handle `multipart/form-data`, which is required for uploading files from the frontend.

 ## Why Multer is used:
- Parses form-data easily  
- Handles file uploads in Express  
- Temporarily stores files in a local folder (like `/upload`)  

---

### 🔹 Cloudinary
Cloudinary is a cloud-based image storage service.

## What happens here:
- The image received by Multer is uploaded to Cloudinary  
- Cloudinary stores the actual image in the cloud  
- It returns a secure URL for that image  

---

###  Workflow

1. User selects an image in the frontend  
2. FormData is sent to backend  
3. Multer processes the file and stores it temporarily  
4. The file is uploaded to Cloudinary  
5. Cloudinary returns an image URL  
6. That URL is stored in MongoDB (not the actual image)  
7. Frontend displays the image using the URL  

---



