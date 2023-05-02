import { Task } from "../../../../src/backend/task/domain/Task";
import { TaskStatus } from "../../../../src/backend/task/domain/TaskStatus";

describe("Task", () => {
	let task: Task;
	const uuid = "test-uuid";
	const description = "test description";
	const userId = "test-userId";

	beforeEach(() => {
		task = new Task(uuid, description, userId);
	});

	it("should have a uuid, description, userId, status, startTime and null endTime", () => {
		expect(task.uuid).toEqual(uuid);
		expect(task.description).toEqual(description);
		expect(task.userId).toEqual(userId);
		expect(task.status).toEqual(TaskStatus.PENDING);
		expect(task.startTime).toBeInstanceOf(Date);
		expect(task.endTime).toBeNull();
	});

	it("should be able to update description and status", () => {
		const newDescription = "new description";
		const newStatus = TaskStatus.COMPLETED;

		task.description = newDescription;
		task.status = newStatus;

		expect(task.description).toEqual(newDescription);
		expect(task.status).toEqual(newStatus);
	});
});
