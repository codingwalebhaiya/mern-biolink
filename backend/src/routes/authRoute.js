import { Router } from "express"; 
import {
  register,
  login,
  changePassword,
  getMe,
  updateUsername,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
// import { mightContain } from "../services/bloomFilterService.js";
// import userModel from "../models/userModel.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.put("/change-password", authMiddleware, changePassword);
authRouter.get("/me", authMiddleware, getMe);
authRouter.patch("/update-username", authMiddleware, updateUsername);
// authRouter.post('/logout', authMiddleware, logoutUser);
// authRouter.post('/refresh-token', refreshAccessToken)

// routes/userRoutes.js (add to your existing file)
// authRouter.post('/check', async (req, res) => {
//   const { username } = req.body;

//   if (mightContain(username)) {
//     const existingUser = await userModel.findOne({ username });
//     if (existingUser) {
//       return res.status(409).json({ message: 'Username is taken.' });
//     }
//   }
//   res.status(200).json({ message: 'Username is available!', available: true });
// });

export default authRouter;
