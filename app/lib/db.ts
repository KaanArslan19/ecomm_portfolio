import mongoose from "mongoose";

const url = process.env.MONGODB_URI!;

const startDb = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(url);
    }
    return mongoose;
  } catch (error) {
    throw new Error((error as any).message);
  }
};

export default startDb;
