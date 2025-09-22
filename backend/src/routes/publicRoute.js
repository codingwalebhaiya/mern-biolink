import express from "express";
import getPublicProfile from "../controllers/publicController.js";

const publicRouter = express.Router();

// Get public profile and links by username
publicRouter.get("/:username", getPublicProfile);

export default publicRouter;
