import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";
import {
  getProfile,
  updateProfile,
  uploadCoverImage,
  uploadProfileAvatar,
} from "../controllers/profileController.js";

const profileRouter = Router();

profileRouter.get("/", authMiddleware, getProfile);
profileRouter.put("/", authMiddleware, updateProfile);

//Make sure you have multer middleware before this route
profileRouter.put(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  uploadProfileAvatar
);

profileRouter.put(
  "/cover-image",
  authMiddleware,
  upload.single("coverImage"),
  uploadCoverImage
);

export default profileRouter;
