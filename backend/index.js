import express from "express";
import dotenv from "dotenv";
import dbConnect from "./src/config/db.js";
import cors from "cors";
import authRouter from "./src/routes/authRoute.js";
import linkRouter from "./src/routes/linkRoute.js";
import publicRouter from "./src/routes/publicRoute.js";
import profileRouter from "./src/routes/profileRoute.js";
import settingsRouter from "./src/routes/settingsRoute.js";
  
dotenv.config();
dbConnect();
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // Serve static files
 
// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/links", linkRouter);
app.use("/api/v1/public", publicRouter);
app.use("/api/v1/settings", settingsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large" });
    }
  }

  res.status(500).json({ message: "Something went wrong!" });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
