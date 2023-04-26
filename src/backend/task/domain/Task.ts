import { v4 as uuidv4 } from "uuid";

import { TaskStatus } from "./TaskStatus";

export class Task {
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
