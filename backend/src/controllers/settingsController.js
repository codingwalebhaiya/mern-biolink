import mongoose from "mongoose";
import linkModel from "../models/linkModel.js";
import profileModel from "../models/profileModel.js"
import userModel from "../models/userModel.js";

const deleteUserAccount = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const userId = req.user._id; // From authentication middleware
    
    // 1. Delete all user's links
    await linkModel.deleteMany({ user: userId }).session(session);
    
    // 2. Delete user's profile
    await profileModel.deleteOne({ user: userId }).session(session);
    
    // 3. Delete the user
    await userModel.findByIdAndDelete(userId).session(session);
    
    await session.commitTransaction();
    session.endSession();
    
    res.status(200).json({
      success: true,
      message: "Account deleted successfully"
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    
    console.error("Account deletion error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete account"
    });
  }
};

export default deleteUserAccount; 