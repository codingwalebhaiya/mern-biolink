import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const reservedUsernames = [
  "admin",
  "support",
  "help",
  "api",
  "login",
  "signup",
  "google",
  "apple",
];

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      validate: {
        validator: (value) => {
          const regex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]{3,30}(?<![_.])$/;
          return regex.test(value) && !reservedUsernames.includes(value);
        },
        message: "Invalid or reserved username",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, //Don't include password in queries by default
    },

    links: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Link",
      },
    ],
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  },

  { timestamps: true }
);

// hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
}); 

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
