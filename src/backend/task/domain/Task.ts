import { ITask } from "./ITask";
import { TaskStatus } from "./TaskStatus";

export class Task implements ITask {
	status: TaskStatus;
	startTime: Date;
	endTime: Date | null;

	constructor(readonly uuid: string, public description: string, readonly userId: string) {
		this.status = TaskStatus.PENDING;
		this.startTime = new Date();
		this.endTime = null;
	}
}
