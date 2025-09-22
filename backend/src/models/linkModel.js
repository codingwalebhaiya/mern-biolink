import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    title: {
      type: String, // Optional custom title
      required: true,
      trim: true,
      maxlength: 50,
    },
    order: {
      type: Number, // for ordering links
      unique:true,
      default: 0,
    },
    clicks: { type: Number, default: 0 },
    //isActive: { type: Boolean, default: true }, // show/hide
   
  },
  {
    timestamps: true,
  }
);


const linkModel = mongoose.model("Link", linkSchema);
export default linkModel;
