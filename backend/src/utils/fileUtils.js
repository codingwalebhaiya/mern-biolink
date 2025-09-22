import fs from "fs";
import path from "path";

export const createUploadsFolder = () => {
  const uploadsPath = path.join(process.cwd(), "public", "temp");

  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
    console.log("Uploads folder created");
  }
};
