import mongoose from "mongoose";

const connectMongoDB = async (): Promise<typeof mongoose> =>
	await mongoose.connect("mongodb://127.0.0.1:27017/MongoUserRepository");

export default connectMongoDB;
