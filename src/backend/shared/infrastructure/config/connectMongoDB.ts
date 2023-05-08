import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const options = {
	//autoIndex: false, // Don't build indexes
	//maxPoolSize: 10, // Maintain up to 10 socket connections
	serverSelectionTimeoutMS: 1000, // Keep trying to send operations for 5 seconds
	socketTimeoutMS: 5000, // Close sockets after 45 seconds of inactivity
	//family: 4 // Use IPv4, skip trying IPv6
};
const connectMongoDB = async (): Promise<typeof mongoose> =>
	await mongoose.connect(`${process.env.MONGO_URI}`, options);

export default connectMongoDB;
