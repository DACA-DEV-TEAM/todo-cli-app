import { Task, TaskStatus } from "../../../../src/user/domain/entities/Task";

describe("Task", () => {
	let task: Task;

	beforeEach(() => {
		task = new Task("Buy milk");
	});
	it("should have a unique Id", () => {
		expect(task.id).toBeDefined();
	});
	it("should have a description", () => {
		expect(task.description).toEqual("Comprar leche");
	});

	it("debe tener endTime como null initially", () => {
		expect(task.endTime).toBeNull();
	});

	it("should be able to set the task status as PENDING initially", () => {
		expect(task.status).toBe(TaskStatus.PENDING);
	});
});
