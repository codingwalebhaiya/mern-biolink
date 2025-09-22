import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from Authorization header- remove "Bearer " prefix
    // const token = req.headers.authorization?.split(" ")[1]; // Alternative way to extract token
    // const token = req.cookies.token; // If using cookies instead of headers
    if (!token) {
      return res.status(401).json({
        message: "No token provided, authorization denied",
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // verify token using secret key
    const user = await userModel.findById(decoded.userId).select('-password');; // fetch user from DB and exclude password field
    if (!user) {
      return res.status(401).json({
        message: "Token is not valid",
      });
    }
    req.userId = decoded.userId; // attach user ID to request
    req.user = user; // attach user object to request
    next();
  } catch (error) {
    res.status(401).json({
       message: "Token is not valid",
       error: error.message,
    
    });
  }
};
export default authMiddleware;
