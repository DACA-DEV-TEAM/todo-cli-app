import { v4 as uuidv4 } from "uuid";

enum TaskStatus {
	PENDING = "Pending",
	COMPLETED = "Completed",
}
class Task {
	readonly id: string;
	status: TaskStatus;
	startTime: Date;
	endTime: Date | null;

	constructor(public description: string) {
		this.id = uuidv4();
		this.status = TaskStatus.PENDING;
		this.startTime = new Date();
		this.endTime = null;
	}
}
export { Task, TaskStatus };
