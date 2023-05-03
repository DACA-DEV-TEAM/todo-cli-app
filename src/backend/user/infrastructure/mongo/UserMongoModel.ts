import { model, Schema } from "mongoose";

import { IUserMongo } from "./IUserMongo";

const UserSchema: Schema = new Schema({
	uuid: { type: String, required: true },
	userName: { type: String, required: true },
	password: { type: String, required: true },
});

const userMongoModel = model<IUserMongo>("Users", UserSchema);

export default userMongoModel;
