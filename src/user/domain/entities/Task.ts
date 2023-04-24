import { v4 as uuidv4 } from "uuid";

enum TaskStatus {
	PENDING = "Pending",
	COMPLETED = "Completed",
	ON_GOING = "On going",
}
class Task {
	readonly id: string;
	readonly userId: string;
	status: TaskStatus;
	startTime: Date;
	endTime: Date | null;

	constructor(public description: string, id: string) {
		this.id = uuidv4();
		this.userId = id;
		this.status = TaskStatus.PENDING;
		this.startTime = new Date();
		this.endTime = null;
	}
}
export { Task, TaskStatus };
