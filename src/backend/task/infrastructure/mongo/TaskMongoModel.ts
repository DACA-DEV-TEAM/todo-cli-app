import { model, Schema } from "mongoose";

import { TaskStatus } from "../../domain/TaskStatus";
import { ITaskMongo } from "./ITaskMongo";

const TaskSchema: Schema = new Schema({
	uuid: { type: String, required: true },
	description: { type: String, required: true },
	userId: { type: String, required: true },
	status: { type: String, enum: TaskStatus, required: true },
	startTime: { type: Date, required: true },
	endTime: { type: Date, required: false },
});

const taskMongoModel = model<ITaskMongo>("Tasks", TaskSchema);

export default taskMongoModel;
