import {
  getUserLinks,
  updateLink,
  deleteLink,
  addLink,
} from "../controllers/linkController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { Router } from "express";

const linkRouter = Router();

// Authenticated user routes
linkRouter.post("/", authMiddleware, addLink);
linkRouter.get("/", authMiddleware, getUserLinks);
linkRouter.put("/:linkId", authMiddleware, updateLink);
linkRouter.delete("/:linkId", authMiddleware, deleteLink);

export default linkRouter;
