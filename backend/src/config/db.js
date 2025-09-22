import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default dbConnect;
 