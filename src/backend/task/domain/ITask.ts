import { TaskStatus } from "./TaskStatus";

export interface ITask {
	uuid: string;
	description: string;
	userId: string;
	status: TaskStatus;
	startTime: Date;
	endTime: Date | null;
}
