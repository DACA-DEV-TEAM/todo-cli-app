import { model, Schema } from "mongoose";

import { ITaskMongo } from "./ITaskMongo";

const TaskSchema: Schema = new Schema({
	uuid: { type: String, required: true },
	description: { type: String, required: true },
	userId: { type: String, required: true },
	status: { type: Enumerator, required: true },
	startTime: { type: Date, required: true },
	endTime: { type: Date, required: true },
});

const taskMongoModel = model<ITaskMongo>("Tasks", TaskSchema);

export default taskMongoModel;
