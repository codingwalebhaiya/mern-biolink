import { Router } from "express";
import deleteUserAccount from "../controllers/settingsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const settingsRouter = Router();

settingsRouter.delete("/account", authMiddleware , deleteUserAccount)

export default settingsRouter;