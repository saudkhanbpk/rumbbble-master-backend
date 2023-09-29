const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v4: uuidv4 } = require("uuid");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryDeleteImg = async (fileToDelete) => {
     return new Promise((resolve) => {
       cloudinary.uploader.destroy(fileToDelete, (error, result) => {
         console.log("result :: ", result);
         resolve(
           {
             url: result.secure_url,
             asset_id: result.asset_id,
             public_id: result.public_id,
           },
           {
             resource_type: "auto",
           }
         );
       });
     });
   };
   module.exports = cloudinaryDeleteImg;