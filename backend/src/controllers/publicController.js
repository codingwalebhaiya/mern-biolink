import userModel from "../models/userModel.js";
import linkModel from "../models/linkModel.js";
import profileModel from "../models/profileModel.js";

// GET /api/public/:username
export const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;

    // 1. Find the user
    const user = await userModel
      .findOne({ username: username.toLowerCase().trim() })
      .select("username _id").lean(); // You are telling Mongoose to return only the fields
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   // const profile = user?.profile;

   // 2. Get profile
    const profile = await profileModel
      .findOne({
        user: user._id,
      })
      .select("displayName bio avatar profileCoverImage") //  Explicitly listed public profile fields
      .lean(); // .lean() makes the result a plain JS object (faster for read-only).

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // 3. Get links
    const links = await linkModel
      .find({
        user: user._id,
        //  isActive: true
      })
      .sort({ order: 1 })
      .select("title url")
      .lean();

    // .select('-_id title url') means:
    //title → include
    //url → include
    // - _id → explicitly exclude the _id field.

   // const links = user?.links || [];

    // 4. Return public data
    res.status(200).json({
      username: user?.username,
      profileCoverImage: profile?.profileCoverImage || "",
      profileImage: profile?.avatar || "",
      bio: profile?.bio || "",
      displayName: profile?.displayName || "",
      links,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching public profile",
      error: error.message,
    });
  }
};

export default getPublicProfile;
