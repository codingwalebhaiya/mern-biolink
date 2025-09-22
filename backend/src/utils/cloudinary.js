import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

// configure cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// function to upload file to cloudinary
const uploadOnCloudinary = async (localFilePath, folderName = "avatars") => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: folderName,
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath); // remove local file after upload
    return response; // return the url of the uploaded file

    //  return {
    //    url: response.secure_url, // return the secure URL of the uploaded file
    //    public_id: response.public_id, // useful for future delete/update
    //  };
  } catch (error) {
    // Remove file from local storage if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary upload error:", error.message);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
