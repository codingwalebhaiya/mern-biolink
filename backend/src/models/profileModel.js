import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",

      // cloudinary service give a url for accessing image or pdf file - this is service like aws cloud service. he store file,image, pdf etc
    },

    profileCoverImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const profileModel = mongoose.model("Profile", profileSchema);
export default profileModel;
