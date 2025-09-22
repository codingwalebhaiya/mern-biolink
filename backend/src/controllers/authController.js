import profileModel from "../models/profileModel.js";
import userModel from "../models/userModel.js";
import generateToken from "../utils/jwtToken.js";

const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  try {
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    if (!(password === confirmPassword)) {
      return res.status(401).json({
        message: "Passwords do not match",
      });
    }

    const existedUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    // 1. Check Bloom filter
    // if (mightContain(username)) {
    //   // 2. Filter said 'maybe', query database for definitive check
    //   const existingUser = await userModel.findOne({ username });
    //   if (existingUser) {
    //     return res.status(409).json({ message: 'Username is already taken.' });
    //   }
    // }

    // const existedUser = await userModel.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        message: "User already exists with this email or username",
      });
    }

    // 3. Bloom filter said 'no' or database check passed, proceed with registration
    // 1. Create new user
    const user = new userModel({
      username,
      email,
      password, // The model's pre-save hook will hash this from the userModel,
    });
    await user.save();

    // 4. Add new username to the Bloom filter
    //addUsername(username);

    // Create profile for the user
    const profile = new profileModel({
      user: user._id, // Link profile to user
      displayName: username,
    });
    await profile.save();

    // Update user with profile reference
    user.profile = profile._id;
    await user.save();

    // Do NOT generate a token here. A token is for authentication, which happens on login.
    // Generate token
    // const token = generateToken(user._id);

    //  const completeUser = await userModel
    //   .findById(user._id)
    //   .populate("profile")
    //   .populate("links")
    //   .select("-password");

    res.status(201).json({
      message: "User registered successfully. Please login",
      // token,
      user,
      // user: {
      //   _id: user._id,
      //   username: user.username,
      //   email: user.email,
      //   // Do not send back the password hash
      // },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed ",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    // Expect 'identifier' from the request body, not username/email
    const { identifier, password } = req.body;

    //Validate that 'identifier' was provided
    if (!identifier || !password) {
      return res.status(400).json({
        message: "Please provide a username/email and a password",
      });
    }

    // Normalize the identifier to lowercase to match the stored username/email
    const normalizedIdentifier = identifier.toLowerCase();

    // Find user from database
    const user = await userModel
      .findOne({
        $or: [
          { username: normalizedIdentifier },
          { email: normalizedIdentifier },
        ],
      })
      .select("+password"); // Explicitly select the password for comparison

    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid user credentials",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // const completeUser = await userModel
    //   .findById(user._id)
    //   .populate("profile")
    //   .populate("links")
    //   .select("-password");

    res.status(200).json({
      message: "User logged In successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await userModel.findById(req.user?._id).select("+password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // --- Step 1: Validate new and current password ---
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }
    if (newPassword !== currentPassword) {
      return res.status(400).json({
        message: "New password and confirmation password do not match",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters long",
      });
    }

    //const user = await userModel.findById(req.user?._id);

    // Check current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    // Update password
    user.password = newPassword; // The pre('save') hook will automatically hash the new password which is defined in the userModel
    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error changing password",
      error: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication failed. User ID not found.",
      });
    }

    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({
      message: "Error changing password",
      error: error.message,
    });
  }
};

const updateUsername = async (req, res) => {
  const { newUsername } = req.body;

  // 1. Validate new username format
  if (
    !/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]{3,30}(?<![_.])$/.test(newUsername)
  ) {
    return res.status(400).json({ message: "Invalid username format" });
  }

  // 2. Check availability
  const existingUser = await userModel.findOne({ username: newUsername });
  if (existingUser) {
    return res.status(409).json({ message: "Username already taken" });
  }

  // 3. Update
  const user = await userModel.findById(req.user._id);
  user.username = newUsername.toLowerCase();
  await user.save();

  res.json({
    message: "Username updated successfully",
    username: user.username,
  });
};

export { register, login, changePassword, getMe, updateUsername };
