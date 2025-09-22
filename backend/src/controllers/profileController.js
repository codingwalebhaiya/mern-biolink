import profileModel from "../models/profileModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const updateProfile = async (req, res) => {
  try {
    const { bio, displayName } = req.body;
    let profile = await profileModel.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // const updatedUser = await profileModel.findByIdAndUpdate(
    //   req.userId,
    //   { bio, displayName },
    //   {
    //     new: true,
    //   }
    // );

    // Update profile fields
    profile.displayName = displayName || profile.displayName;
    profile.bio = bio || profile.bio;

    profile = await profile.save();
    return res
      .status(201)
      .json({ message: "Profile updated successfully", profile });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await profileModel
      .findOne({ user: req.user._id })
      .populate("user", ["email"]);

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
      error: error.message,
    });
  }
};

const uploadProfileAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profile = await profileModel.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Delete old avatar if exists
    // Extract public_id from the URL (assuming standard Cloudinary URL format)
    // if (profile.avatar) {
    //   const publicId = profile.avatar.split("/").pop().split(".")[0];
    //   await deleteFromCloudinary(publicId);
    // }
    const avatarLocalPath = req.file?.path;

    // upload new avatar to cloudinary
    if (!avatarLocalPath) {
      return res.status(400).json({ message: "Avatar file is missing" });
    }

    const result = await uploadOnCloudinary(avatarLocalPath, "avatars");
    console.log(result);
    if (!result) {
      return res
        .status(500)
        .json({ message: "Failed to upload to Cloudinary" });
    }

    profile.avatar = result.secure_url;
    await profile.save();

    res.status(200).json({
      message: "Avatar uploaded successfully",
      avatar: profile.avatar,
    });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const uploadCoverImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profile = await profileModel.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Delete old avatar if exists
    // if (profile.profileCoverImage) {
    // Extract public_id from the URL
    //   const publicId = profile.profileCoverImage.split("/").pop().split(".")[0];
    //   await deleteFromCloudinary(publicId);
    // }
    const avatarLocalPath = req.file?.path;

    // upload new cover image to cloudinary
    if (!avatarLocalPath) {
      return res.status(400).json({ message: "Avatar file is missing" });
    }

    const result = await uploadOnCloudinary(avatarLocalPath, "cover-images");
    console.log(result);
    if (!result) {
      return res
        .status(500)
        .json({ message: "Failed to upload to Cloudinary" });
    }

    // Update profile with new cover image URL
    profile.profileCoverImage = result.secure_url;
    await profile.save();

    res.status(200).json({
      message: "Cover image uploaded successfully",
      coverImage: profile.profileCoverImage,
    });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getProfile, updateProfile, uploadProfileAvatar, uploadCoverImage };
