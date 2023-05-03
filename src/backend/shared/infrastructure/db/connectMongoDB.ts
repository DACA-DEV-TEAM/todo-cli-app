import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectMongoDB = (async (): Promise<typeof mongoose> =>
	await mongoose.connect(`${process.env.MONGO_URI}`))();

export default connectMongoDB;
