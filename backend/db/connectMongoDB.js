import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log("MongoDB 连接成功");
  } catch (error) {
    console.log("MongoDB 连接失败:", error);
  }
}

export default connectToMongoDB;